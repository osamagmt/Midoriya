const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
  name: "clear",
  category: "Moderation",
  aliases: ["purge"],
  description: "Clear Your Messages!",
  usage: "Clear <Message Amount>",
  run: async (client, message, args) => {
    //Start

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You Don't Have Permission To Use This Command!"
      );

    if (!args[0])
      return message.channel.send(`Please Give Me Amounts Of Messages!`);

    if (isNaN(args[0]))
      return message.channel.send(`Please Give Me Number Value!`);

    if (args[0] < 1)
      return message.channel.send(
        `You Can Delete ${args[0]} By Your Self Its Not Too Many Messages!`
      );

    if (args[0] > 100)
      return message.channel.send(
        `I Can't Delete ${args[0]} messages Because Of Discord Limit!`
      );

    let Reason = args.slice(1).join(" ") || "No Reason Provided!";

    try {

    message.channel.bulkDelete(Number(args[0])).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Messages Deleted!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
        .addField(`Deleted Messages`, `${Message.size}`)
        .addField(`Reason`, `${Reason}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      return message.channel
        .send(`Deleted ${Message.size} messages`)
        .then(msg => msg.delete({ timeout: 7000 }));
    });

    } catch (error) {
      return message.channel.send(`I Can Only Delete Messages Under 14 Days!`);
    }
  }


    //End
  
};