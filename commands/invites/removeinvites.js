const Discord = require("discord.js")
// const translate = require("translate-google")
const config = require('../../config.js')
const db = require('quick.db')
module.exports = {
name: "removeinvites",
aliases:['removeinv', 'removeinvite', 'removeinvs', 'invitesremove'],
description: "shows your/user invites",
usage: `addinvites [@user] [amount of invites]`,
category: "invites",
run: async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) 
  let embeduser = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL())
  .setDescription(`You must mention auser to add to him invites`)
  .setColor(`2C2F33`)
  .setFooter(message.guild.name , client.user.displayAvatarURL())
  .setTimestamp()

  if(!user) return message.channel.send(embeduser);
  let embedinvites = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL())
  .setDescription(`You must enter an vaild amount of invites (only numbers)`)
  .setColor(`2C2F33`)
  .setFooter(message.guild.name , client.user.displayAvatarURL())
  .setTimestamp()

 if(!args[1]) return message.channel.send(embedinvites);
 if(isNaN(args[1])) return message.channel.send(embedinvites);
 let userinvites = db.get(`invites_${message.guild.id}_${user.id}`)
 if(!userinvites) {
return message.channel.send(`User doesn't have any invites to remove!`)
}


  
 
 db.subtract(`invites_${message.guild.id}_${user.id}.invites`, args[1])
 db.subtract(`invites_${message.guild.id}_${user.id}.bouns`, args[1])

 
let a = {
    added: `[-] Removed ${args[1]} invites by ${message.author.username}`
}
 db.push(`logs_${message.guild.id}_${user.id}`, a)
 let done = new Discord.MessageEmbed()
 .setAuthor(message.guild.name, message.guild.iconURL())
 .setDescription(`Removed ${args[1]} invites from ${user.username}`)
 .setColor(`2C2F33`)
 .setFooter(message.guild.name , client.user.displayAvatarURL())
 .setTimestamp()
message.channel.send(done)
 }
}