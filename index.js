require('dotenv').config();
const Discord = require('discord.js');
global.Discord = Discord;
const bot = new Discord.Client();
global.bot = bot;

const ucbWords = ["berk", "berkeley", "berekeley", "berkley", "ucberkeley", "ucberekely", "ucberkley"]
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
  try {
    const canReplyInChannel = msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES', false);
    if (msg.author.bot || !canReplyInChannel) return;
    const cleanedWords = msg.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\W+/);
    const culprits = ucbWords.filter(val => cleanedWords.includes(val));

    if (cleanedWords.includes("ucb")) {
      if (culprits.length == 0) {
        await msg.react('🇺');
        await msg.react('🇨');
        await msg.react('🇧');
      } else {
        msg.reply(`Thanks for referring to UCB as UCB on the internet, but make sure to be consistent; always do it.
  I am a bot, and this action was performed automatically. Please contact Daddy Khosla if you have any questions or concerns.`);
      }
      return;
    }

    if (culprits.length > 0) {
      msg.reply(`Please refer to UCB as UCB on the internet.
  I am a bot, and this action was performed automatically. Please contact Daddy Khosla if you have any questions or concerns.`)
    }
  } catch (err) {
    console.log("ah fuck, I can't believe you've done this!");
    return;
  }
});
