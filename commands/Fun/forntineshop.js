const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
const fs = require('fs');
module.exports = {
    name: "forniteshop",
    category: "Fun",
  aliases: ["fnshop","fns"],
    usage: "fnshop",
    description: "Shows the item in fortnite shop",
    run: async (client, message, args) => {
    //Start
const kek = new Discord.MessageEmbed()
.setTitle('FORTNITE SHOP')
.setImage('https://pepee.ga/fnshop')
.setColor("RED");
message.channel.send(kek);
    }
}