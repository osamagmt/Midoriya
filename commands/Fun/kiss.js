const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "Kiss",
    category: "Fun",
  aliases: ["kiss"],
    usage: "kiss <mention>",
    description: "kiss's the mentioned guy",
    run: async (client, message, args) => {
     const user = message.mentions.users.first() || message.author;
    const slapped = message.author.id === user.id ? "themselfs" : user.username;

    const data = await fetch("https://no-api-key.com/api/v1/kiss").then((res) =>
    res.json()
    );
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} kissed ${slapped}`)
        .setImage(`${data.image}`)
    message.channel.send(embed)
    }
}