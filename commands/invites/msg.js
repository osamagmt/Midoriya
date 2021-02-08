const Discord = require("discord.js")
// const translate = require("translate-google")
const config = require('../../config.js')
const db = require('quick.db')
module.exports = {
name: "setmessage",
aliases:['setguildmessage', 'setinvitemessage', 'setmsg'],
description: "set ur guild join message",
usage: `setmessage [message]`,
category: "invites",

run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Select Type
    1️⃣ Join
    2️⃣ Leave
    3️⃣ View Currect Join And leave message
    ❌ Cancel
    `)
    .setColor(`2C2F33`)
    .setFooter( message.guild.name , client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed).then(async react => {
        react.react('1️⃣')
        react.react('2️⃣')
        react.react('3️⃣')
        react.react('❌')
        const select = react.createReactionCollector((reaction, user) =>
        reaction.emoji.name === "1️⃣" || "2️⃣" || "3️⃣"  || "❌" &&
        user.id === message.author.id,
      { time: 60000 });
      select.on("collect", async (reaction, user) => {
        if(user.id === client.user.id) return;
     if(reaction.emoji.name === "1️⃣"){
await react.reactions.removeAll()
await select.stop()
let embedo = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setTitle('Please Send The new Join message')
.setDescription(`
variables:
{inviter} = inviter username
{invites} = inviter invites
{user} = member name
{total} = inviter regular invites
{leaves} = inviter leaves invites
{jointimes} = user total join times
to cancel type "cancel"
`)
.setColor(`2C2F33`)
.setFooter( message.guild.name , client.user.displayAvatarURL())
.setTimestamp()
react.edit(embedo)
let joina = m => m.author.id === message.author.id;
let join = new Discord.MessageCollector(message.channel, joina, { max: 1 });

join.on('collect', async msg => {
if(msg.content.toLowerCase() === "cancel") {
    msg.channel.send(`Canclled`)
    await react.delete()
    await join.stop()
 return
}
let changed = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setTitle(' ')
.setDescription(`
Sucssesfully Updated join message`)
.setColor(`2C2F33`)
.setFooter( message.guild.name , client.user.displayAvatarURL())
.setTimestamp()

await react.edit(changed)
await db.set(`join_message_${message.guild.id}`, msg.content)
await join.stop()
})
    }   
if(reaction.emoji.name === "2️⃣") {
await react.reactions.removeAll()
await select.stop()
let embedo = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setTitle('Please Send The new Leave message')
.setDescription(`
variables:
{inviter} = inviter username
{invites} = inviter invites
{user} = member name
{total} = inviter regular invites
{leaves} = inviter leaves invites
{jointimes} = user total join times
to cancel type "cancel"
`)
.setColor(`2C2F33`)
.setFooter( message.guild.name , client.user.displayAvatarURL())
.setTimestamp()
react.edit(embedo)
let joina = m => m.author.id === message.author.id;
let join = new Discord.MessageCollector(message.channel, joina, { max: 1 });

join.on('collect', async msg => {
if(msg.content.toLowerCase() === "cancel") {
    msg.channel.send(`Canclled`)
    await react.delete()
    await join.stop()
 return
}
let changed = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setTitle(' ')
.setDescription(`
Sucssesfully Updated Leave message`)
.setColor(`2C2F33`)
.setFooter( message.guild.name , client.user.displayAvatarURL())
.setTimestamp()

await react.edit(changed)
await db.set(`leave_message_${message.guild.id}`, msg.content)
await join.stop()
})

}  
if(reaction.emoji.name === "3️⃣") {
await react.reactions.removeAll()
await select.stop()
let embed = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setDescription(`
Join Message => 
${db.get(`join_message_${message.guild.id}`) || config.join}
Leave Message => 
${db.get(`leave_message_${message.guild.id}`) || config.leave}
Vanity Join => 
${config.unkown} [Can't be changed]
`)
.setColor(`2C2F33`) 
.setFooter( message.guild.name , client.user.displayAvatarURL())
.setTimestamp()
return react.edit(embed)
}
if(reaction.emoji.name === "❌") {
    await react.reactions.removeAll()
    await select.stop()
    let embedo = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
     .setDescription(`
     Canclled   
     `)
    .setColor(`2C2F33`)
    .setFooter( message.guild.name , client.user.displayAvatarURL())
    .setTimestamp()
  return  react.edit(embedo)
    }
})
    })
}
}