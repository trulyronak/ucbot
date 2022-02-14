require('dotenv').config();
const Discord = require('discord.js');
global.Discord = Discord;
const bot = new Discord.Client();
global.bot = bot;

const ucbWords = ["berkeley", "berekeley", "cal"]
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  const cleanedWords = msg.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\W+/);
  const culprits = ucbWords.filter(val => cleanedWords.includes(val));

  if (culprits.length > 0) {
    msg.reply(`Please refer to UCB as UCB on the internet.
I am a bot, and this action was performed automatically. Please contact Daddy Khosla if you have any questions or concerns.`)
  }
});
