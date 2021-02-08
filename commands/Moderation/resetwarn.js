const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const db = require('quick.db');
module.exports = {
    name: "resetwarns",
  aliases: ["rw"],
    category: "Moderation",
    usage: "Resetwarns <Mention User> | <Reason>",
    description: "Reset All Warnings Of User!",
    run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );
        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!Member) return message.channel.send(`Please Mention A Valid User!`);

        if (Member.user.id === message.author.id) return message.channel.send(`You Can't Reset Your Own Warnings!`);

        if (Member.user.id === client.user.id) return message.channel.send(`I Don't Have Any Warnings!`);

        let Reason = args.slice(1).join(" ");

        let Embed = new MessageEmbed()
            .setColor(Color)
            .setTitle(`User Warnings Resetted!`)
            .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
            .addField(`User`, `${Member.user.tag} (${Member.user.id})`)
            .addField(`Reason`, `${Reason || "No Reason Given!"}`)
            .setTimestamp();

        if (!Member.user.bot) Member.user.send(`Your All Warnings In **${message.guild.name}** Has Been Resetted | Reason : ${Reason || "No Reason Given!"}`);

        await db.set(`Warnings_${message.guild.id}_${Member.user.id}`, 0);

        return message.channel.send(Embed);
    }
}