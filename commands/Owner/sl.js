const {
  Default_Prefix,
  Token,
  Color,
  Support,
  Owner
} = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "serverlist",
  aliases: ["sl"],
  category: "Owner",
  description: "Server list",
  usage: "serverlist",
  run: async (client, message, args) => {
    if (parseInt(Owner !== message.author.id))
      return message.channel.send(
        "You Don't Have Permission To Use This Command - Bot Owner"
        
      );
       client.guilds.cache.forEach((guild) => {
                      const gn = `${guild.name}`
                      const servermember = `${guild.memberCount}`
                      const serverownername = `${guild.owner.user.username}`
const embed = new Discord.MessageEmbed()
.setTitle('Server List')
.setDescription(`**${gn}** => ${servermember} Members || Owner Name : ${serverownername}`, {
      split: { char: "\n" }});
                    message.channel.send(embed)
                    
                    })

                    }
                    }