const discord = require("discord.js");
const color = `RANDOM`;

const db = require('wio.db')
module.exports = {
    name: "snipe",
    category: "Fun",
  aliases: ["snpe"],
    usage: "snipe",
    description: "Snipes a deleted text",
    run: async (client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
        if(!msg) return message.channel.send("there is no deleted messages")
        const embed = new discord.MessageEmbed()
        .setAuthor(msg.author, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(msg.content)
        .setColor('RANDOM')
        .setTimestamp()
        if(msg.image)embed.setImage(msg.image)
        message.channel.send(embed)
        }
        }