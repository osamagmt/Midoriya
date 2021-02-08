const Discord = require("discord.js")
// const translate = require("translate-google")
const config = require('../../config.js')
const db = require('quick.db')
module.exports = {
name: "inviterole",
aliases:['rolerewards', 'inviterolerewards', "addrole"],
description: "show guild rank roles",
usage: `inviterole`,
category: "invites",
run: async (client, message, args) => {
    let norole = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setDescription(`**Select**
   :one: add
   :two: remove
   :x: cancel
    `)
    .setColor(`2C2F33`)
    .setFooter(message.guild.name , client.user.displayAvatarURL())
    .setTimestamp()
   message.channel.send(norole).then(react => {
      react.react('1️⃣')
      react.react('2️⃣')
      react.react('❌')
      const select = react.createReactionCollector((reaction, user) =>
      reaction.emoji.name === "1️⃣" || "2️⃣"  || "❌" &&
      user.id === message.author.id,
    {          
       time: 60000,
       errors: ['time']
});
select.on("collect", async (reaction, user) => {
if(user.id === client.user.id) return;
if(reaction.emoji.name === "2️⃣") {
   await react.reactions.removeAll()
   await select.stop()
   let norole = new Discord.MessageEmbed()
   .setAuthor(message.guild.name, message.guild.iconURL())
   .setDescription(`Mention the role you want to remove from invite role rewards
   `)
   .setColor(`2C2F33`)
   .setFooter(message.guild.name , client.user.displayAvatarURL())
   .setTimestamp()
react.edit(norole)
   let role = m => m.author.id === message.author.id;
   let rolecollecter = new Discord.MessageCollector(message.channel, role, { max: 1 });
rolecollecter.on('collect', async msg => {
   let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(msg.content)
   if(!role) {
      msg.channel.send(`Can't find this role , try again with vaild role`)
   } else {
   let data = db.fetch(`ranks_${message.guild.id}`)
   let database = data.find(x => x.role === role.id)
   if(!database) return msg.channel.send(`Invaild, theres no role exist with ${role.name} on invite role database`)
   if(database) {
      let value = data.indexOf(database)
      delete data[value]
    
      var filter = data.filter(x => {
        return x != null && x != ''
      })
    
      db.set(`ranks_${message.guild.id}`, filter)
    return msg.channel.send(`Sucssesfully Deleted`)
   }
   }
})
   }
   if(reaction.emoji.name === "❌") {
      await react.reactions.removeAll()
await select.stop()
let pog = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL())
.setDescription(`Canclled`)
.setColor(`2C2F33`)
.setFooter(message.guild.name , client.user.displayAvatarURL())
.setTimestamp()
react.edit(pog)


   }
if(reaction.emoji.name === "1️⃣") {
// let data = db.fetch(`ranks_${message.guild.id}`)
// let database = data.find()
await react.reactions.removeAll()
await select.stop()
let pog = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL())
.setDescription(`Please Mention The role you want`)
.setColor(`2C2F33`)
.setFooter(message.guild.name , client.user.displayAvatarURL())
.setTimestamp()
react.edit(pog)


let roleauthor = m => m.author.id === message.author.id;
let rolecollecter = new Discord.MessageCollector(message.channel, roleauthor, { max: 1 });

rolecollecter.on('collect', async msg => {
let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(msg.content)
if(!role) {
   msg.channel.send(`I can-t Find this role please try again with vaild role.`)
} else {
   let data = db.fetch(`ranks_${message.guild.id}`)
 if(!data) {
   let pfog = new Discord.MessageEmbed()
   .setAuthor(message.guild.name, message.guild.iconURL())
   .setDescription(`Please Type the amount of invites that user should has to get this role`)
   .setColor(`2C2F33`)
   .setFooter(message.guild.name , client.user.displayAvatarURL())
   .setTimestamp()
   msg.channel.send(pfog)
      await rolecollecter.stop()
      let amountAuthor = m => m.author.id === message.author.id;
      let amountCollecter = new Discord.MessageCollector(message.channel, amountAuthor, { max: 1 });
   amountCollecter.on('collect', async msg => { 
      if(isNaN(msg.content)) return msg.channel.send(`Failed Amount should be only numbers`)
      let amounnt = msg.content;
      if(amounnt.includes('-', '.')) return msg.channel.send(`Nope`)
      let pogdata = {
         role: role.id,
         invites: amounnt 
      }
      db.push(`ranks_${message.guild.id}`, pogdata)
      let pogger = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
   .setDescription(`Sucssesfully Created New Invite role\nRole: ${role.name}\nAmount of invites: ${msg.content}`)
   .setColor(`2C2F33`)
   .setFooter(message.guild.name , client.user.displayAvatarURL())
   .setTimestamp()
    msg.channel.send(pogger)
   await amountCollecter.stop()
     })
return;   
 }
   let database = data.find(x => x.role === role.id)
   if(database) return msg.channel.send(`That Role is already on inviteroles remove it of you want to change the amount of invites.`)
   let pfog = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL())
.setDescription(`Please Type the amount of invites that user should has to get this role`)
.setColor(`2C2F33`)
.setFooter(message.guild.name , client.user.displayAvatarURL())
.setTimestamp()
msg.channel.send(pfog)
   await rolecollecter.stop()
   let amountAuthor = m => m.author.id === message.author.id;
   let amountCollecter = new Discord.MessageCollector(message.channel, amountAuthor, { max: 1 });
amountCollecter.on('collect', async msg => { 
   if(isNaN(msg.content)) return msg.channel.send(`Failed Amount should be only numbers`)
   let amounnt = msg.content;
   if(amounnt.includes('-', '.')) return msg.channel.send(`Nope`)
   let pogdata = {
      role: role.id,
      invites: amounnt 
   }
   db.push(`ranks_${message.guild.id}`, pogdata)
   let pogger = new Discord.MessageEmbed()
   .setAuthor(message.guild.name, message.guild.iconURL())
.setDescription(`Sucssesfully Created New Invite role\nRole: ${role.name}\nAmount of invites: ${msg.content}`)
.setColor(`2C2F33`)
.setFooter(message.guild.name , client.user.displayAvatarURL())
.setTimestamp()
 msg.channel.send(pogger)
await amountCollecter.stop()
  })
}
 
})
}

})
})
}
}