const Discord = require("discord.js");
const Color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "youtube",
    category: "Fun",
  aliases: ["yt", "comment"],
    usage: "youtube <text>",
    description: "Show your message as youtube comment",
    run: async (client, message, args) => {
    let yt = await canvacord.Canvas.youtube({"avatar":message.author.displayAvatarURL({format: "png"}),"username":message.author.username, "content":args.join(" ")})
        let attachment = new Discord.MessageAttachment(yt, 'comment.png')
        message.channel.send(attachment)

    }
}