const Discord = require("discord.js")
// const translate = require("translate-google")
const config = require('../../config.js')
const hastebin = require("hastebin-gen");
const moment = require('moment')
const db = require('quick.db')
module.exports = {
name: "info",
aliases:['inf', 'infos', 'infouser'],
description: "shows user info",
usage: `info [@user]`,
category: "invites",

run: async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) 
  let embeduser = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL())
  .setDescription(`You must mention auser to check his info`)
  .setColor(`2C2F33`)
  .setFooter(message.guild.name , client.user.displayAvatarURL())
  .setTimestamp()

  if(!user) return message.channel.send(embeduser);
  let invites = db.fetch(`invites_${message.guild.id}_${user.id}`)
  if(!invites) {
    let data = {
      invites: 0,
      regular: 0,
      leaves: 0,
      joins: 0,
      by: null,
      bouns: 0   
      }
      db.set(`invites_${message.guild.id}_${user.id}`, data)

      let embed = new Discord.MessageEmbed()
      .setTitle(`${user.username} `)
      .addField('Join Date', moment(message.guild.member(user.id).joinedAt).format('DD/MM/YYYY hh:mm A') ,true)
      .addField('Join Times', '0' , true)
      .addField('Invited By', 'Null' , true)
      .addField('Invites', `0 total (0 regular 0 leaves 0 bouns)`, true)
      .addField('Added/Removed Invites', `${data.split("\n") || '[0/0]'}`, true)
      .setFooter(message.guild.name  , message.guild.iconURL())
      .setTimestamp();
      return message.channel.send(embed)

  }
  let data = []
  let logs = db.get(`logs_${message.guild.id}_${user.id}`)
  if(logs && logs.length) {
  logs.forEach(x => {
      data.push(x.added)
  })}
  let omg = data.length;
  console.log(omg)
  if(omg  > 10) {
    hastebin(data.join("\n"), { extension: "txt" }).then(haste => {
      data = haste;
      console.log('test')
     });
  }
     let embed = new Discord.MessageEmbed()
        .setTitle(`${user.username} `)
        .addField('Join Date', moment(message.guild.member(user.id).joinedAt).format('DD/MM/YYYY hh:mm A') ,true)
        .addField('Join Times', invites.joins || '0' , true)
        .addField('Invited By', invites.by || 'unkown#0001' , true)
        .addField('Invites', `${invites.invites || '0'} total (${invites.regular || '0'} regular ${invites.leaves || '0'} leaves ${invites.bouns || '0'} bouns)`, true)
        .addField('Added/Removed Invites', `${data.join("\n") || '[0/0]'}`, true)
        .setFooter(message.guild.name  , message.guild.iconURL())
        .setTimestamp();
        return message.channel.send(embed)
    }
}