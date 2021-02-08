const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "hug",
    category: "Fun",
  aliases: ["cuthug"],
    usage: "hug <mention>",
    description: "hugs the mentioned guy",
    run: async (client, message, args) => {
     let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;

    try {
        const url = 'https://nekos.life/api/v2/img/hug';
        fetch(url)
            .then(res => res.json())
            .then(async json => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("🤗")
                        .setImage(json.url)
                        .setDescription(`${victim} is hugged by ${message.author}`)
                    return message.channel.send(embed)
                })
        }catch (error) {
            return;
        }

    }
}