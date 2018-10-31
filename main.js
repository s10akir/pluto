'use strict';

require('dotenv').config();
const Eris = require('eris');
const bot = new Eris(process.env.BOT_TOKEN);


bot.on('ready', () => {
  console.log('Ready!');
});

bot.connect();
