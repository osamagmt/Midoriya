const { Default_Prefix, Color, Owner, Support, Donate } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "invite",
  aliases: ["invitelink"],
  category: "Utility",
  description: "Give You My Invite Link",
  usage: "Invite",
  run: async (client, message, args) => {
    
    const Invite = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`, Owne = `<@${Owner}>`, Dev = `ZNC么ᴳᵒᵈl๏ภel𝕪#2390`;
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thanks")
    .addField("Invite Me", `[Click Me](${Invite})`, true)
    .addField("Support Server", `[Click Me](${Support})`, true)
    .addField("Owner", Owne, true)
    .addField("Developer", Dev)
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("Invite Link - " + Invite));
  }
};