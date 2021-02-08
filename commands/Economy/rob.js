const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "rob",
  aliases: ["steal"],
  category: "Economy",
  description: "Rob someone",
  usage: "rob <mention>",
  run: async (client, message, args) => {
  let user = message.mentions.members.first()
let targetuser = await db.fetch(`bank_${user.id}`)
let author = await db.fetch(`rob_${user.id}`)
let author2 = await db.fetch(`money_${user.id}`)

let timeout = 600000;

if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:x: You have already bankrobbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {

let moneyEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`:x: You need atleast 500 coins in your wallet to heist someone's bank`);

if (author2 < 500) {
    return message.channel.send(moneyEmbed)

}
let moneyEmbed2 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`:x: ${user.user.username} doesnot have even 100 donot rob from poors`);
if (author2 < 100) {
    return message.channel.send(moneyEmbed2)
}



let vip = await db.fetch(`premium_${user.id}`)
if(vip === true) random = Math.floor(Math.random() * 800) + 1;
if (vip === null) random = Math.floor(Math.random() * 600) + 1;

let embed = new Discord.MessageEmbed()
.setDescription(`:white_check_mark: You robbed ${user} and got away with ${random} coins`)
.setColor("RANDOM")
message.channel.send(embed)

db.subtract(`money_${user.id}`, random)
db.add(`money_${user.id}`, random)
db.set(`rob_${user.id}`, Date.now())
  }
  }
}