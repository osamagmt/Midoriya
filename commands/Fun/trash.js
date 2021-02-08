const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "trash",
    category: "Fun",
  aliases: ["no aliases"],
    usage: "trash <mention>",
    description: "Show a trash image",
    run: async (client, message, args) => {
let avatar = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({size: 512, format: "png"}) : message.author.displayAvatarURL({size: 512, format: "png"})
    
    let image = await canvacord.Canvas.trash(avatar)
    let attachment = new Discord.MessageAttachment(image, "trash.png")
    message.channel.send(attachment)
  }
}
function match(msg, i) {
  if (!msg) return undefined;
  if (!i) return undefined;
  let user = i.members.cache.find(
    m =>
      m.user.username.toLowerCase().startsWith(msg) ||
      m.user.username.toLowerCase() === msg ||
      m.user.username.toLowerCase().includes(msg) ||
      m.displayName.toLowerCase().startsWith(msg) ||
      m.displayName.toLowerCase() === msg ||
      m.displayName.toLowerCase().includes(msg)
  );
  if (!user) return undefined;
  return user.user;
}