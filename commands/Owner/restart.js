const {
  Default_Prefix,
  Token,
  Color,
  Support,
  Owner
} = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "restart",
  aliases: ["rs"],
  category: "Owner",
  description: "Restart The Bot!",
  usage: "Restart",
  run: async (client, message, args) => {
    if (parseInt(Owner !== message.author.id))
      return message.channel.send(
        "You Don't Have Permission To Use This Command - Bot Owner"
      );
    
    await client.guilds.cache.forEach(g => {
      client.queue.get(g.id) ? client.queue.delete(g.id) : null
    });
let a = new Discord.MessageEmbed()
.setTitle('Processing The Request...')
.setDescription('**[︎1/4]**')
.setColor('RED')
let b = new Discord.MessageEmbed()
.setTitle('Destroying The Client...')
.setDescription('**[2/4]**')
.setColor('RED')
let c = new Discord.MessageEmbed()
.setTitle('Client Destroyed !')
.setDescription('**[3/4]**')
.setColor('RED')
let d = new Discord.MessageEmbed()
.setTitle('Re-Logging...')
.setDescription('**[4/4]**')
.setColor("RED")
let e = new Discord.MessageEmbed()
.setTitle('Logged in as ' + client.user.tag)
.setColor("GREEN")
let f = new Discord.MessageEmbed()
.setTitle('Bot Restarted !')
.setColor('GREEN')
  message.channel.send(a).then((msg) =>{
  setTimeout(function(){
    msg.edit(b).then((msg2)=>{
      setTimeout(function(){
     msg2.edit(c).then((msg3) =>{
   setTimeout(function(){
       msg3.edit(d).then((msg4) =>{
   setTimeout(function(){
       msg4.edit(e).then((msg5) =>{
   msg5.edit(f)
       }, 3000)
     }, 4000)
     }, 4000)
     }, 4000)
     }, 2000)
     }, 3000)
     }, 5000)
     }, 5000)
     }, 5000).then(msg => client.destroy())
    .then(() => client.login(Token)).then(() => console.log("Bot has been Restarted")
  )
  }
};