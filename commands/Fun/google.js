const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
const fs = require('fs');
module.exports = {
    name: "google",
    category: "Fun",
  aliases: ["noo aliases"],
    usage: "google <text>",
    description: "Searches google",
    run: async (client, message, args) => {
   const TOKEN = "5c35595d-6d61-4845-8747-c107660ff9cd" // Get your token from here : https://fortnitetracker.com/site-api
if(args[0]){
       

      const kek = new Discord.MessageEmbed()
.setTitle('GOOGLE')
.setDescription(`[HERE IS YOUR SEARCH RESULT](https://www.google.com/search?q=${args[0]})`)
.setColor("RED");
   message.channel.send(kek)
       
}
      
      if(!args[0]){
        message.channel.send('PLEASE GIVE A ARGUMENT TO SEARCH')
      }
      
    }
}