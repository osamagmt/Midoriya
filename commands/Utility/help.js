const { Default_Prefix, Color, Support, Donate } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Utility",
  description: "Bot Help Command ;)",
  usage: "Help | <Command Name>",
  run: async (client, message, args) => {
    let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    
    const Config = client.commands.filter(cmd => cmd.category === "Config").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const Music = client.commands.filter(cmd => cmd.category === "Music").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const Other = client.commands.filter(cmd => cmd.category === "Utility").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const Mod = client.commands.filter(cmd => cmd.category === "Moderation").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const NSFW = client.commands.filter(cmd => cmd.category === "NSFW").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
        const Fun = client.commands.filter(cmd => cmd.category === "Fun").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
               const Gw = client.commands.filter(cmd => cmd.category === "Giveaway").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
               const Gwe = client.commands.filter(cmd => cmd.category === "invites").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
                const Gwee = client.commands.filter(cmd => cmd.category === "LogoGen").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setTitle(`${client.user.username}'s Help menu`)
    .setDescription(`Type The Following Command For A Specific Command Information -\n**${Prefix}Help <Command Name>**\n\n <a:music1:800619179903549441>  **Music**\n > ${Music}\n\n <a:AT_pink1Hammer:800617519336783882> **Moderation ** \n > ${Mod} \n\n :underage: **NSFW **\n > || ${NSFW}|| \n\n <a:AT_LOL:800617936615637043>  ** Fun **\n > ${Fun} \n\n <a:tada1:800618292561444894> ** Giveaway** \n ${Gw} \n\n :link: **Invites:** \n > ${Gwe} \n\n <a:gear1:800618498018639892>** Utility**\n > ${Other}\n\n **<a:information:800652575703171135> Info**:- \n botinfo\n\n**:diamond_shape_with_a_dot_inside: LogoGen** \n > ${Gwee} \n\n **🕹 Config**\n${Config}\n\n`)
    .setFooter(`Requested By ${message.author.username}`)
    .setImage('https://images-ext-2.discordapp.net/external/O3Y9SEKTpgDx9poNgw4Gi2E0s9aLs7axoJFdcQflLvU/https/cdn.discordapp.com/avatars/786246327716675596/151b3cc2babb2aa44e93a10c019cf7f3.webp')
    .setTimestamp();
if(!args[0]) return message.channel.send(Embed)
   let command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
    
    if (!command) return message.channel.send(`No Command Found - ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
      .setThumbnail(message.author.displayAvatarURL({ dyanmic: true }))
    .setTitle(`Information on ${command.name.charAt(0).toUpperCase() + command.name.slice(1), false}`)
    .addField(`Name`, command.name.charAt(0).toUpperCase() + command.name.slice(1), false)
    .addField(`Category`, command.category || "No Category", false)
    .addField(`Aliases`, command.aliases ? command.aliases.join(", ") : "No Aliases", false)
    .addField(`Usage`, command.usage, false)
    .addField(`Description`, command.description, false)
    .setFooter(`Requested By ${message.author.username}`)
    .setTimestamp();
    
    return message.channel.send(Embeded);
  }
};