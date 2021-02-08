const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "slap",
    category: "Fun",
  aliases: ["no aliases"],
    usage: "slap <mention>",
    description: "slap's the mentioned guy",
    run: async (client, message, args) => {
       const user = message.mentions.users.first() || message.author;
    const slapped = message.author.id === user.id ? "themselfs" : user.username;

    const data = await fetch("https://nekos.life/api/v2/img/slap").then((res) =>
    res.json()
    );
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} slapped ${slapped}`)
        .setImage(`${data.url}`)
    message.channel.send(embed);
    }
}