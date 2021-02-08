const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "screenshot",
    category: "Fun",
  aliases: ["ss"],
    usage: "screenshot <link>",
    description: "`Takes a screenshot from the following site`",
    run: async (client, message, args) => {
    //Start
   const urls = args[0];
        const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
        try {
            const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
            return message.channel.send(`Screenshot`, { files: [{ attachment: body, name: 'screenshot.png' }] } );
        } catch (err) {
            if (err.status === 404) return message.channel.send('Could not find any results. Invalid URL?');
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}