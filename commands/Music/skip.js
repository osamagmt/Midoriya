const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "skip",
  aliases: [],
  category: "Music",
  description: "Skip Currently Playing Song!",
  usage: "Skip",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Please Join A Voice Channel!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send(":musical_note: Nothing Is Playing Right Now, Add Some Songs To Queue :D");
    
    if (!Queue.Playing) Queue.Playing = true;
    
    Queue.Bot.dispatcher.end();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setDescription(":musical_note:  Music Has Been Skipped!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send(":musical_note:  Music Has Been Skipped!"));
  }
};