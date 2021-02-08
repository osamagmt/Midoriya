const Discord = require("discord.js");
const Color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "avatar",
    category: "Utility",
  aliases: ["av"],
    usage: "av <mention>",
    description: "shows the user avatar",
    run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    
    const avatarEmbed = new Discord.MessageEmbed()
        .setColor(0x333333)

        .setAuthor(user.username)
        .setImage(user.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM");
    message.channel.send(avatarEmbed);

    }
}