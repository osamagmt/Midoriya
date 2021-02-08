const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const db = require('quick.db')
module.exports = {
    name: "warn",
    category: "Moderation",
  aliases: ["w"],
    usage: "Warn <Mention User> | <Reason>",
    description: "Warn A User!",
    run: async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) return message.channel.send(`Please Mention A Valid User!`);

        if (user.user.id === message.author.id) return message.channel.send(`You Can't Warn YourSelf!`);

        if (user.user.id === client.user.id) return message.channel.send(`Please Don't Warn Me!`);

        let Reason = args.slice(1).join(" ");

        let Embed = new MessageEmbed()
            .setColor(Color)
            .setTitle(`User Warned!`)
            .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
            .addField(`User`, `${user.user.tag} (${user.user.id})`)
            .addField(`Reason`, `${Reason || "No Reason Given!"}`)
            .setTimestamp();

        if (!user.user.bot) user.user.send(`You Have Been Warned In **${message.guild.name}** For : ${Reason || "No Reason Given!"}`);

        await db.add(`Warnings_${message.guild.id}_${user.user.id}`, 1);

        return message.channel.send(Embed);
    }
}