const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "wiki",
    category: "Fun",
  aliases: ["wikipedia"],
    usage: "wiki <text>",
    description: "searchs the wikipeadia",
    run: async (client, message, args) => {
   const body = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,
    ).then(res => res.json().catch(() => {}));
  
  if (!body) return message.channel.sendmessage.channel.send({embed: {
                color: "FF0000",
                title: "❌ Error Page Not Found."
            }})
    if (body.title && body.title === "Not found.") return message.channel.send({embed: {
                color: "FF0000",
                title: "❌ Error Page Not Found."
            }});

  const embed = new Discord.MessageEmbed()
      .setTitle(`🌐 ${body.title} `)
  .addField("More Info: ",`**[Click Here!](${body.content_urls.desktop.page})**`, true)
      .setDescription(`** ${body.extract}**`)
      .setColor(`FF0000`)
  .setTimestamp()
   if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
  message.channel.send(embed);


    }
}