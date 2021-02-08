const Discord = require("discord.js");
const Color = `RANDOM`;
const fs = require('fs')
const path = require('path')
const ms = require('ms')
const db = require('wio.db')
module.exports = {
    name: "gend",
    category: "Giveaway",
  aliases: ["giveawayend"],
    usage: "gend",
    description: "end a giveaway",
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
    try {
        client.giveawaysManager.edit(messageID, {
            setEndTimestamp: Date.now()
        }).then(() => {
            const embwed = new Discord.MessageEmbed()
                .setTitle(' :white_check_mark: **SUCCESS** :white_check_mark:')
                .setColor('#00FF00')
                .setDescription("Giveaway ended!")
            return message.channel.send(embwed)
        })
    } catch (e) {
        console.log(e)
        const ewm3bed = new Discord.MessageEmbed()
            .setTitle('**ERROR**')
            .setColor('#FF0000')
            .setDescription("No giveaway exist with that message ID!")
        return message.channel.send(ewm3bed)
    }
}
}