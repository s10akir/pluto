'use strict';

require('dotenv').config();
const Eris = require('eris');
const bot = new Eris.CommandClient(process.env.BOT_TOKEN, {}, {
    prefix: '!' 
});


bot.on('ready', () => {
  console.log('Ready!');
});

bot.on('voiceChannelJoin', (member, newChannel) => {
  const textChannel = newChannel.guild.channels.find((channel) => channel.type === 0);
  const msg = `[bot] ${member.username} が通話をはじめました`;
  bot.createMessage(textChannel.id, msg);
});

bot.on("voiceChannelLeave", (member, oldChannel) => {
  const textChannel = oldChannel.guild.channels.find((channel) => channel.type === 0);
  const msg = `[bot] ${member.username} が通話をやめました`;
  bot.createMessage(textChannel.id, msg);
});

bot.connect();

