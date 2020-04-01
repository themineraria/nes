const Discord = require('discord.js');
const client = new Discord.Client();
var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if (msg.content === '!dog') {
    msg.reply('*Woof!*');
  }
  
  if(msg.content.startsWith("!nessay")) {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    if(msg.member.roles == null || !msg.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)))
      return msg.reply("WOOF :angry: !");
    const sayMessage = msg.content.split(" ");
    sayMessage.splice(0, 1);
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    msg.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    msg.channel.send(sayMessage.join(" "));
  }
  
});
client.login('Njk0Njc4NTYzNDYyMzE2MDky.XoPILw.rcQ6SP_30O3JvZ7Hu2zhaHrsDvM');
