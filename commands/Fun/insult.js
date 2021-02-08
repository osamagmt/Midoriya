const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const Fetch = require("node-fetch"); //Install Node-Fetch - npm i node-fetch

module.exports = {
  name: "insult",
  category: "fun",
  description: "Insult Someone!",
  aliases: ["no aliases"],
  usage: "Insult",
  run: async (client, message, args) => {

    //Start

    let res = await Fetch(`https://evilinsult.com/generate_insult.php?lang=en&type=json`);
    let json = await res.json();

    let embed = new MessageEmbed()
    .setColor(Color)
    .setDescription(json.insult)
    .setTimestamp();

    message.channel.send(embed);

    //End
  }
};