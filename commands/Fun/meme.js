const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "meme",
    category: "Fun",
  aliases: ["no aliases"],
    usage: "meme",
    description: "`Posts random meme`",
    run: async (client, message, args) => {
    //Start
   //Start
 
        const Reds = [
            "memes",
            "me_irl",
            "dankmemes",
            "comedyheaven",
            "Animemes"
        ];
 
        const Rads = Reds[Math.floor(Math.random() * Reds.length)];
 
        const res = await fetch(`https://www.reddit.com/r/${Rads}/random/.json`);
 
        const json = await res.json();
 
        if (!json[0]) return message.channel.send(`Your Life Lmfao`);
 
        const data = json[0].data.children[0].data;
 
        const Embed = new Discord.MessageEmbed()
            .setColor(color)
            .setURL(`https://reddit.com${data.permalink}`)
            .setTitle(data.title)
            .setDescription(`Author : ${data.author}`)
            .setImage(data.url)
            .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
            .setTimestamp();
 
        let meme = await message.channel.send(Embed);
 meme.react('👍')
      meme.react('👎')
        //End
 
    }
}