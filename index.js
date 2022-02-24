require('dotenv').config();
const Discord = require('discord.js');
global.Discord = Discord;
const bot = new Discord.Client();
global.bot = bot;

const ucbWords = ["berk", "berkeley", "berekeley", "berkley", "ucberkeley", "ucberekely", "ucberkley", "The University of California, Berkeley (UC Berkeley, Berkeley, Cal, or California)[11][12] is a public land-grant research university in Berkeley, California. Established in 1868 as the University of California, it is the state's first land-grant university and the first campus of the University of California system. Its fourteen colleges and schools offer over 350 degree programs and enroll some 31,000 undergraduate and 12,000 graduate students.[5][13][14] Berkeley is ranked among the world's top universities.[15] A founding member of the Association of American Universities, Berkeley hosts many leading research institutes, including the Mathematical Sciences Research Institute and the Space Sciences Laboratory. It founded and maintains close relationships with three national laboratories at Berkeley, Livermore and Los Alamos,[16] and has played a prominent role in many scientific advances, from the Manhattan Project and the discovery of 16 chemical elements to breakthroughs in computer science and genomics.[17] Berkeley is also known for political activism and the Free Speech Movement of the 1960s.[18] Berkeley's athletic teams, which compete as the California Golden Bears primarily in the Pac-12 Conference, have won 107 national championships, and its students and alumni have won 223 Olympic medals (including 121 gold medals).[19][20] Berkeley alumni and faculty count among their ranks 114 Nobel laureates, 25 Turing Award winners, 14 Fields Medalists, 28 Wolf Prize winners, 108 MacArthur Genius Grant recipients, 30 Pulitzer Prize winners, and 19 Academy Award winners. The university has produced seven heads of state or government; six chief justices, including Chief Justice of the United States Earl Warren;[21] 22 cabinet-level officials; 11 governors; and 25 living billionaires.[22] It is also a leading producer of Fulbright Scholars, MacArthur Fellows, and Marshall Scholars.[23] Berkeley alumni, widely recognized for their entrepreneurship, have founded numerous notable companies, including Apple, Tesla, Intel, eBay, SoftBank, AIG, and Morgan Stanley.[24][25]"]
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
