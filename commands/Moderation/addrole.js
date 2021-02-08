const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const db = require('quick.db')
module.exports = {
    name: "giverole",
    category: "Moderation",
    usage: "giverole <mention> <role>",
  aliases: ["gr"],
    description: "Give role of a user",
    run: async (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_ROLE"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );
          const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('Please specify someone to give a role to.')
      return
    }

    args.shift()

    const roleName = args.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      message.reply(`There is no role with the name "${roleName}"`)
      return
    }

    const member = guild.members.cache.get(targetUser.id)
    member.roles.add(role)

    message.reply(`that user now has the "${roleName}" role`)
    }
}