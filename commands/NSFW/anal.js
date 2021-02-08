const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "anal",
    category: "NSFW",
  aliases: ["no aliases"],
    usage: "anal",
    description: "Shows a anal image",
    run: async (client, message, args) => {
      const superagent = require("superagent");
        const { body } = await superagent.get(
      "https://nekobot.xyz/api/image?type=anal")
        
      if(message.channel.nsfw){
        
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} Here is a picture of anal`)
        .setImage(body.message)
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