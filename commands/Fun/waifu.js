const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')


const db = require('wio.db')
module.exports = {
    name: "waifu",
    category: "Fun",
  aliases: ["w"],
    usage: "waifu",
    description: "sends a random waifu img",
    run: async (client, message, args) => {
        const lient = require('waifu.js')
 
let api = new lient()
const anime = await api.sfw.waifu();
      const kek = new Discord.MessageEmbed()
      .setImage(anime)
      .setColor('RANDOM')
      .setDescription(`Here is your waifu`);
      message.channel.send(kek);
    
    }
    
}