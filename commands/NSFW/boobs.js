const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "boobs",
    category: "NSFW",
  aliases: ["tits"],
    usage: "boobs",
    description: "Shows a boobs image",
    run: async (client, message, args) => {
      const superagent = require("superagent");
     const id = [Math.floor(Math.random() * 10930)];
    const res = await superagent.get(`http://api.oboobs.ru/boobs/${id}`);
    const preview = res.body[0]["PREVIEW".toLowerCase()];
    const image = `http://media.oboobs.ru/${preview}`;

      if(message.channel.nsfw){
        
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} Here is a picture of boobs`)
        .setImage(image)
    message.channel.send(embed);
      }
      if (!message.channel.nsfw) {
        message.react('💢');
        return message.channel.send({embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
            }})
    }

    }
}