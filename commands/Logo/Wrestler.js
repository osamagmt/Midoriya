const Discord = require("discord.js");
const Color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "wrestler",
    category: "LogoGen",
  aliases: ["wlr"],
    usage: "wrestler <text>",
    description: "generate a logo with the textthe text",
    run: async (client, message, args) => {
        const question = args.join(" ");
    if (!question) {
        const errorembed = new Discord.MessageEmbed()
            .setColor(`#ff0000`)
            .setTimestamp()
            .setDescription(`:x: ** | Please type something after the command!**`);        return message.channel.send(errorembed)
    } else {
        const loadingEmbed = new Discord.MessageEmbed()
            .setColor("#ffb640")
            .setDescription(`<a:AT_botload:801729897986654238> **Generating your Logo!...**`)
        let msg = await message.channel.send(loadingEmbed)
        const encodedQuestion = question.replace(/[' '_]/g, "+");
        const text = new Discord.MessageEmbed()
            .setColor('#ffb640')
            .setTitle('Link to your logo!')
            .setURL(`https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=wrestler-logo&text=${encodedQuestion}`)
            .setImage(`https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=wrestler-logo&text=${encodedQuestion}`)
        
            .setTimestamp()
          
        msg.edit(text);
    }
    }
}