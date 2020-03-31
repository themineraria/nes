const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
  if (msg.content === '!dog') {
    msg.reply('*Woof!*');
  }
});
client.login('Njk0Njc4NTYzNDYyMzE2MDky.XoPILw.rcQ6SP_30O3JvZ7Hu2zhaHrsDvM');
