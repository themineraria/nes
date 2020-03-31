const Discord = require('discord.js');
const client = new Discord.Client();

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
    const sayMessage = msg.content.split(" ");
    sayMessage.splice(0, 1);
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    msg.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    msg.channel.send(sayMessage.join(" "));
  }
  
});
client.login('Njk0Njc4NTYzNDYyMzE2MDky.XoPILw.rcQ6SP_30O3JvZ7Hu2zhaHrsDvM');
