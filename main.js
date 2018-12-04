'use strict';

require('dotenv').config();
const Eris = require('eris');
const bot = new Eris.CommandClient(process.env.BOT_TOKEN, {}, {
  prefix: '/'
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

bot.registerCommand('ksv-sai', (message, args) => {
    if (args.length === 0) {
      return '[!] please see help. run /help ksv-sai'
    }

    const command = args[0];
    switch (command) {
        case 'get':
            return '0000-00: dummypasswd';  // TODO

        case 'set':
            return 'update password. old => new';  // TODO

        default:
            return `[!] ${command}: command not found.`
    }
  }, {
    description: 'ksv-saiのあれこれ',
    fullDescription: 'ksv-saiのpasswordを管理するコマンド。',
    usage: ['```',
            '/ksv-sai get          : 最新のpasswordを返す',
            '/ksv-sai set PASSWORD : 新しいpasswordを登録する',
            '```'
           ].join('\n')
  });

bot.connect();
