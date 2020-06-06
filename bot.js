const Discord = require('discord.js');
const cluster = require('cluster');
const fs = require('fs');
const moment = require('moment');
var schedule = require('node-schedule');

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {

  const client = new Discord.Client();
  let admin_roles = new Array();
  let newbie_roles = new Array();

  client.on('ready', () => {

      /*try{
        var data = fs.readFileSync('admin_roles.txt', 'UTF-8');
        var lines = data.split(/\r?\n/);
        lines.forEach((line) => {
          if (line != '')
            admin_roles.push(line);
        });
      }catch(err){}*/
      try{
        var data = fs.readFileSync('newbie_roles.txt', 'UTF-8');
        var lines = data.split(/\r?\n/);
        lines.forEach((line) => {
          if (line != '')
            newbie_roles.push(line);
        });
      }catch(err){}

      //for each server
      newbie_roles.forEach(newbie_role => {
        newbie_arr = newbie_role.split(".");
        client.guilds.get(newbie_arr[0]).roles.forEach(role => {
          if (newbie_arr[1] == role.name)
          {
            role.members.forEach(member => {
              if (!member.user.bot)
              {
                appyrole(member);
              }
            });
          }
        });
      });
      client.users.get("272440402819285003").send(client.user.tag + ' is awake !');
	  client.users.get("313478602454990848").send(client.user.tag + ' is awake !');
  });

  process.on('uncaughtException', function (err) {
    if (err.code == 'ENOENT')
    {}
    else {
	  client.users.get("272440402819285003").send("ERROR " + err.code);
	  client.users.get("313478602454990848").send("ERROR " + err.code);
      throw err;
    }
  });

  process.on('unhandledRejection', err => {
    client.users.get("272440402819285003").send("ERROR " + err.code);
	client.users.get("313478602454990848").send("ERROR " + err.code);
    throw err;
  });

  client.on('message', msg => {
    if(msg.author.bot) return;

    if (msg.content === '!nes' || msg.content.includes("🐶")) {
      return msg.reply('*Woof!*');
    }
    if (msg.content.includes("🦴") || msg.content.includes("🍖") || msg.content.includes("🥩")) {
      msg.react('🐶');
      return msg.react('🤤');
    }

    if (msg.content === "HYSAHEBBP") {
      msg.author.send('Bravo, c\'est gagné !!');
      client.channels.get("711664200556085259").send(msg.author.username + "#" + msg.author.discriminator + " " + datetime.toISOString());
      return;
    }

    if(msg.content.startsWith("!nessay")) {
      if (msg.member != null && msg.guild != null && !msg.member.hasPermission('ADMINISTRATOR') && !msg.member.roles.some(r=>admin_roles.includes(msg.guild+'.'+r.name)))
        return msg.reply("*WOOF :angry: !*");
      var sayMessage = msg.content.split(" ");
      sayMessage.splice(0, 1);
      msg.delete().catch(O_o=>{});
      return msg.channel.send(sayMessage.join(" "));
    }

    /*if(msg.content.startsWith("!nesadmin")) {
        if (msg.member != null && msg.guild != null && (msg.member.hasPermission('ADMINISTRATOR') || msg.member.roles.some(r=>admin_roles.includes(msg.guild+'.'+r.name)))) {
          var new_admin_role = msg.content.split(" ");
          new_admin_role.splice(0, 1);
          if (new_admin_role.length == 1)
          {
            if (!admin_roles.includes(new_admin_role[0]))
            {
              fs.appendFileSync('admin_roles.txt', msg.guild.id + '.' + new_admin_role[0] + '\r\n');
              admin_roles.push(new_admin_role[0]);
              return msg.reply("Role " + new_admin_role[0] + " added as nes admin !");
            }
            else {
              return msg.reply("This role is already admin !");
            }
          }
          else {
            return msg.reply("Usage:\n!nesadmin {role}");
          }
        }
    }*/

    if(msg.content.startsWith("!nestemprole")) {
        if (msg.member != null && msg.guild != null && (msg.member.hasPermission('ADMINISTRATOR') || msg.member.roles.some(r=>admin_roles.includes(msg.guild+'.'+r.name)))) {
          var new_temp_role = msg.content.split(" ");
          new_temp_role.splice(0, 1);
          if (new_temp_role.length == 3)
          {
            new_temp_role[0] = new_temp_role[0].replace('_', ' ');
            new_temp_role[2] = new_temp_role[2].replace('_', ' ');
            if (new_temp_role[1].length == 7 && /^\d+$/.test(new_temp_role[1]) && new_temp_role[1][0] <= 7 && new_temp_role[1][1] <= 2 && new_temp_role[1][3] <= 5 && new_temp_role[1][5] <= 5)
            {
              if (!newbie_roles.some(role => role.includes(msg.guild.id+'.'+new_temp_role[0]+'.')))
              {
                fs.appendFileSync('newbie_roles.txt', msg.guild.id + '.' + new_temp_role[0] + '.' + new_temp_role[1] + '.' + new_temp_role[2] + '\r\n');
                newbie_roles.push(msg.guild.id + '.' + new_temp_role[0] + '.' + new_temp_role[1]);
                msg.reply(new_temp_role[0] + " added as new temporary role !");

                newbie_string = msg.guild.id + '.' + new_temp_role[0] + '.' + new_temp_role[1] + '.' + new_temp_role[2];
                newbie_arr = newbie_string.split(".");
                client.guilds.get(newbie_arr[0]).roles.forEach(role => {
                  if (newbie_arr[1] == role.name)
                  {
                    role.members.forEach(member => {
                      if (!member.user.bot)
                      {
                        appyrole(member);
                      }
                    });
                  }
                });
              }
              else {
                return msg.reply("This role is already set as temporary !");
              }
            }
            else {
              return msg.reply("Time " + new_temp_role[1] + " is not valid !");
            }
          }
          else {
            return msg.reply("Usage:\n!nestemprole {temp_role} {date: dhhmmss} {new_role}");
          }
        }
    }

    if(msg.content.startsWith("!nesrtemprole")) {
      if (msg.member != null && msg.guild != null && (msg.member.hasPermission('ADMINISTRATOR') || msg.member.roles.some(r=>admin_roles.includes(msg.guild+'.'+r.name)))) {
        var del_temp_role = msg.content.split(" ");
        del_temp_role.splice(0, 1);
        if (del_temp_role.length == 1)
        {
          del_temp_role[0] = del_temp_role[0].replace('_', ' ');
          if (newbie_roles.some(role => role.includes(msg.guild.id+'.'+del_temp_role[0]+'.')))
          {
            newbie_roles = newbie_roles.filter(e => !e.includes(msg.guild.id+'.'+del_temp_role[0]+'.'));
            let write_roles = "";
            newbie_roles.forEach(role => {
              write_roles += role + '\r\n';
            });
            fs.readFile('newbie_roles.txt', 'utf8', function (err, data) {
              fs.writeFile('newbie_roles.txt', write_roles, function(err, result) {});
            });
            return msg.reply(del_temp_role[0] + " removed from temporary roles !");
          }
          else {
            return msg.reply("This role is not temporary !");
          }
        }
        else {
          return msg.reply("Usage:\n!nesrtemprole {temp_role}");
        }
      }
    }

  });

  client.on("guildMemberAdd", member => {
    newbie_roles.forEach(newbie_role => {
      newbie_arr = newbie_role.split(".");
      if (!member.user.bot && member.guild.id == newbie_arr[0])
      {
        appyrole(member);
      }
    });
  });

  async function appyrole(member)
  {
	var member_joined_date = new Date(member.joinedTimestamp);
	var member_temp_date = moment(member_joined_date)
	  .add(newbie_arr[2][0], 'days')
	  .add(newbie_arr[2][1]+newbie_arr[2][2], 'hours')
	  .add(newbie_arr[2][3]+newbie_arr[2][4], 'minutes')
	  .add(newbie_arr[2][5]+newbie_arr[2][6], 'seconds');
	if (member_temp_date.isBefore())
	  {
		await Promise.all([member.addRole(client.guilds.get(newbie_arr[0]).roles.find(role => role.name == newbie_arr[3])).catch(console.error),
		member.removeRole(client.guilds.get(newbie_arr[0]).roles.find(role => role.name == newbie_arr[1])).catch(console.error)
		]);
	  }
	else {
	  schedule.scheduleJob(member_temp_date.toDate(), async function(){
		await Promise.all([member.addRole(client.guilds.get(newbie_arr[0]).roles.find(role => role.name == newbie_arr[3])).catch(console.error),
		member.removeRole(client.guilds.get(newbie_arr[0]).roles.find(role => role.name == newbie_arr[1])).catch(console.error)
		]);
	  });
	}
  }

    client.login('');
}
