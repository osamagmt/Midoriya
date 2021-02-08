const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "bal",
  aliases: ["balance"],
  category: "Economy",
  description: "Check your balance",
  usage: "bal",
  run: async (client, message, args) => {
      let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${user.id}`)
  if (bank === null) bank = 0;
const math = require('mathjs')
const net = math.evaluate(`${bal} + ${bank}`)
  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**${user}'s Balance**\n\nWallet: ⏣${bal}\nBank: ⏣${bank}\n Networth: ⏣${net}`);
  message.channel.send(moneyEmbed)
  }
}