const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const db = require('quick.db')
module.exports = {
    name: "warns",
    category: "Moderation",
    usage: "Warns <Mention User>",
  aliases: ["ws", "warnings"],
    description: "Show Warnings Of User!",
    run: async (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );
        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!Member) return message.channel.send(`Please Mention A Valid User!`);

        if (Member.user.id === client.user.id) return message.channel.send(`I Don't Have Any Warnings!`);

        let Warns = await db.fetch(`Warnings_${message.guild.id}_${Member.user.id}`);
        if (Warns === null) Warns = "0";

        let Embed = new MessageEmbed()
            .setColor(Color)
            .setDescription(`<@${Member.user.id}> Has ${Warns} Warning${Warns.length > 1 ? "s!" : "!"}`)
            .setTimestamp();

        return message.channel.send(Embed);
    }
}