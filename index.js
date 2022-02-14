require('dotenv').config();
const Discord = require('discord.js');
global.Discord = Discord;
const bot = new Discord.Client();
global.bot = bot;
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const ucbWords = ["berkeley", "berekeley", "cal"]
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  const cleanedWords = msg.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")
  const culprits = ucbWords.filter(val => cleanedWords.includes(val));

  if (culprits.length > 0) {
    msg.reply(`Please refer to UCB as UCB on the internet.
I am a bot, and this action was performed automatically. Please contact Daddy Khosla if you have any questions or concerns.`)
  }
});
