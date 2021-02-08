const db = require('quick.db')
const Discord  = require('discord.js')

module.exports = {
    name : 'afk',
    category: "Utility",
  aliases: ["no aliases"],
    usage: "(reason)",
    description: "Set yourself as afk!",
    run: async(client, message, args) => {
       const status = new db.table("AFKs");
    let afk = await status.fetch(message.author.id);
    const embed = new Discord.MessageEmbed().setColor("RANDOM")
    
    if (!afk) {
      embed.setDescription(`**${message.author.tag}** you are now AFK.\nReason: ${args.join(" ") ? args.join(" ") : "AFK"}\n**Unable to change your nickname!**`)
      status.set(`${message.author.id}_${message.guild.id}`, args.join(" ") || `AFKS`)
message.member.setNickname(`[AFK]  ${message.member.user.username}`)
    }
    message.channel.send(embed)
  }
 }