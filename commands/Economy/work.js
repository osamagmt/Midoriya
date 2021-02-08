const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");
const ms = require('parse-ms')
module.exports = {
  name: "work",
  aliases: ["job"],
  category: "Economy",
  description: "work",
  usage: "work",
  run: async (client, message, args) => {
   let user = message.author;
        let timeout = 600000;
        let author = await db.fetch(`worked_${user.id}`);

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.channel.send(`You cannot work again for ${time.minutes}m and ${time.seconds}s`)
        } else {
         let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic', 'Developer']
let result = Math.floor((Math.random() * replies.length))
            let amount = Math.floor(Math.random() * 300) + 1;
            db.add(`money_${user.id}`, amount)
            db.set(`worked_${user.id}`, Date.now())
const embed = new Discord.MessageEmbed()
.setColor(Color)
        .setDescription(`:white_check_mark: ${user} You worked as a ${replies[result]} and earned ${amount} coins`)
        .setTimestamp();
            message.channel.send(embed)
        }
        }
}