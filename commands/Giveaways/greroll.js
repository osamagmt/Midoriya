const Discord = require("discord.js");
const Color = `RANDOM`;
const fs = require('fs')
const path = require('path')
const ms = require('ms')
const db = require('wio.db')
module.exports = {
    name: "greroll",
    category: "Giveaway",
  aliases: ["giveawayreroll"],
    usage: "greroll",
    description: "reroll a giveaway",
    run: async (client, message, args) => {

  let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');

    if (hasPerm === false) {
        return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle('**:x:ERROR**:x:')
            .setColor('#FF0000')
            .setDescription("You need `MANAGE_MESSAGES` permissions")
        )
    }
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
                  .setTitle('**:x:ERROR**:x:')
            .setColor('#FF0000')
            .setDescription("You need to enter a message ID!")
        return message.channel.send(embed)
    }
    let messageID = args[0];
  client.giveawaysManager.reroll(messageID, {
    messages: {
      congrat: ":tada:・Congratulations: {winners}",
    }
  }).catch((err) => {
    const ewmbed = new Discord.MessageEmbed()
       .setTitle('**:x:ERROR**:x:')
      .setColor('#FF0000')
      .setDescription("No giveaway exists with that message ID!")
    return message.channel.send(ewmbed)
  });
}
}