const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setchatbotchannel",
  aliases: ["chatchannel"],
  category: "Config",
  description: "Set The Chat Channel Of Bot!",
  usage: "setchatbotchannel <channel>",
  run: async (client, message, args) => {
          if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
                color: Color,
            title: `:warning:  You do not have the required Permissions! - [MANAGE_GUILD] `
        }})
if (!args[0]) {
  let b = await db.fetch(`chatbot_${message.guild.id}`);
  let channelName = message.guild.channels.cache.get(b);
  if (message.guild.channels.cache.has(b)) {
    return message.channel.send(
      `**✅ ChatBot Channel Set In This Server Is \`${channelName.name}\`!**`
    );
  } else
    return message.channel.send({embed: {
            color: Color,
            title: `":warning: Please Enter a Channel ID or Channel name to set`
        }})
}
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

    if (!channel || channel.type !== 'text') return message.channel.send({embed: {
            color: Color,
            title: `:warning: Please Enter a Valid Text Channel`
        }})

    try {
        let a = await db.fetch(`chatbot_${message.guild.id}`)

        if (channel.id === a) {
            return message.channel.send({embed: {
            color: Color,
            title: `:information_source:  This Channel is already set as ChatBot Channel!`
        }})
        } else {
            client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`**:white_check_mark: ChatBot Channel Set!**`)
            db.set(`chatbot_${message.guild.id}`, channel.id)

           message.channel.send({embed: {
            color: Color,
            title: `✅ ChatBot Channel has been Set Successfully \`${channel.id}\``
        }})
        }
    } catch {
        return message.channel.send(`**:warning: Error - Missing Permissions Or Channel Is Not A Text Channel!**`);
    }
    }
}