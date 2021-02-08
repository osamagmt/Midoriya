const Discord = require("discord.js");
const color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
const math = require('mathjs')
module.exports = {
    name: "maths",
    category: "Fun",
  aliases: ["calcukate"],
    usage: "maths <problem>",
    description: "`Posts random meme`",
    run: async (client, message, args) => {
  if (!args[0]) return message.channel.send({
embed: {
description: `**Enter Something To Calculate**`
}
});

        let result;
        try {
            result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"));
        } catch (e) {
            const embed = new Discord.MessageEmbed()
                .setDescription("**Enter Valid Calculation!**\n\n**List of Calculations** - \n1. **sqrt equation** - `sqrt(3^2 + 4^2) = 5`\n2. **Units to Units** - `2 inch to cm = 0.58`\n3. **Complex Expressions Like** - `cos(45 deg) = 0.7071067811865476`\n4. **Basic Maths Expressions** - `+, -, ^, /, decimals` = **2.5 - 2 = 0.5**")
                .setColor('RANDOM')
            return message.channel.send(embed);
        }

        let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .addField("**Operation**", `\`\`\`Js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
            .addField("**Result**", `\`\`\`Js\n${result}\`\`\``)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(embed);
    }
}