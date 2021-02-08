const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "blowjob",
    category: "NSFW",
  aliases: ["bj"],
    usage: "blowjob",
    description: "Shows a blowjob",
    run: async (client, message, args) => {
       const cient = require('waifu.js')
 
let api = new cient()
 
    const data = await fetch("https://nekos.life/api/v2/img/blowjob").then((res) =>
    res.json()
    );
      if(message.channel.nsfw){
        const hentai = await api.nsfw.waifu();
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} Here is a picture of blowjob`)
        .setImage(data.url)
    message.channel.send(embed);
      }
      if (!message.channel.nsfw) {
        message.react('💢');
        return message.channel.send({embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
            }})
    }
      async function hello() {
  console.log(await api.nsfw.trap());
}
 
hello()
    }
}