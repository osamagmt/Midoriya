const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const db = require('quick.db')
module.exports = {
    name: "removerole",
    category: "Moderation",
    usage: "takerole <mention> <role>",
  aliases: ["takerole", "tr"],
    description: "Take the role of a guy",
    run: async (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_ROLE"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );
          const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('Please specify someone to remove a role to.')
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

    if (member.roles.cache.get(role.id)) {
      member.roles.remove(role)
      message.reply(`That user no longer has the ${roleName} role`)
    } else {
      message.reply(`That user does not have the ${roleName} role`)
    }
    
    }
}