const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')

const superagent = require('superagent');

const db = require('wio.db')
module.exports = {
    name: "pat",
    category: "Fun",
  aliases: ["p"],
    usage: "pat <mention>",
    description: "pats the mentioned user",
    run: async (client, message, args) => {
  let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/pat");
              const embed = new Discord.MessageEmbed()
             .setColor("RANDOM")
              .setTitle("Here's your Pat, 👀")
          .setDescription(`${victim} Pats ${message.author}`)
          .setImage(body.url)
           .setTimestamp()
              message.channel.send(embed);
    }
    
}