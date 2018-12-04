'use strict';

require('date-utils');
require('dotenv').config();
const Eris = require('eris');
const bot = new Eris.CommandClient(process.env.BOT_TOKEN, {}, {
    prefix: '/'
});

// db
const Sequelize = require('sequelize');
const sequelize = new Sequelize('', '', '', {
    dialect: 'sqlite',
    storage: './database.sqlite3',
    operatorsAliases: false
});

// KsvSai Model
const KsvSai = sequelize.define('ksvSai', {
    password: Sequelize.STRING
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
            return KsvSai.max('id').then((id) => {
                return KsvSai.findOne({where: {id: id}}).then(pass => {
                    return pass.password;
                })
            });

        case 'set':
            // TODO: refactor
            const newPass = args[1];
            sequelize.sync()
                .then(() => KsvSai.create({
                    password: newPass
                }));

            return `update password. : ${newPass}`;  // TODO

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
