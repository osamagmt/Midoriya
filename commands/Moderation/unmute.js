const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
    name: "unmute",
    category: "Moderation",
    usage: "Unmute <Mention User> | <Reason>",
  aliases: ["um"],
    description: "Unmute A User!",
    run: async (client, message, args) => {
            if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "You Don't Have Permission To Use This Command!"
      );

        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!Member) return message.channel.send(`Please Mention A Valid User!`);

        if (Member.user.id === message.author.id) return message.channel.send(`You Can't Unmute YourSelf!`);

        let Role = await message.guild.roles.cache.find(Role => Role.name.toLowerCase() === "muted");

        if (!Role) return message.channel.send(`No Mute Role Found, Member Don't Have Mute Role | Role Name : Muted`);

        let Reason = args.slice(1).join(" ");

        let Embed = new MessageEmbed()
            .setColor(Color)
            .setTitle(`User Unmuted!`)
            .setDescription(`**${Member} has been muted || ${Reason}**`)
            .setTimestamp();

        try {
            await Member.roles.remove(Role.id);
        } catch (error) {
            return message.channel.send(`Something Went Wrong, Try Again Later!`).then(() => console.log(error));
        }

        return message.channel.send(Embed);
    }
}