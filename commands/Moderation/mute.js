const Discord = require("discord.js");
const Color = `RANDOM`;
const db = require('wio.db')
module.exports = {
    name: "mute",
    category: "Moderation",
  aliases: ["m"],
    usage: "Mute <Mention User> | <Reason>",
    description: "Mute A User!",
    run: async (client, message, args) => {
          if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "You Don't Have Permission To Use This Command!"
      );

        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
     let Reason = args.slice(1).join(" ");

           let user = message.mentions.users.first();
        let reason = args.slice(1).join(" ");
        if(!user) {
let embed = new Discord.MessageEmbed(). 
setAuthor(message.author.username , message.author.displayAvatarURL()). 
setDescription(`**Please Mention An Vaild Person**`). 
setFooter(client.user.tag , client.user.displayAvatarURL()). 
setTimestamp()
    return message.channel.send(embed);
 }
 if(!reason) {
  let embed = new Discord.MessageEmbed().
  setAuthor(message.author.username , message.author.displayAvatarURL()). 
  setDescription(`**Please Describe The Reason Of The mute**`). 
  setFooter(client.user.tag , client.user.displayAvatarURL()). 
  setTimestamp()
  message.channel.send(embed)
      return;
 }
 let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
 
 if(!muterole) {
 message.channel.send(`There's No mute role so ill create one.. and retype`)
    message.guild.roles.create({
        data: {
          name: 'Muted',
          color: 'gray',
        },
        reason: 'Mute Role!',
      }).then(async role => {
 message.guild.channels.cache.forEach(darkboy => {
       darkboy.updateOverwrite(role, { SEND_MESSAGES: false })
console.log(darkboy.id)
console.log(role.id)
db.set(`muterole_${message.guild.id}`, role.id)
      })       
    })
 }
      
 message.guild.members.fetch(user).then(member => {
  let aa = message.guild.roles.cache.find(role => role.name === "Muted");
  member.roles.add(aa.id)

        let embed = new Discord.MessageEmbed()
            .setColor(Color)
            .setTitle(`User Muted!`)
           .setDescription(`**${Member} has been muted || ${Reason}**`)
            .setTimestamp();

 message.channel.send(embed)
 })
    }
}