const Discord = require("discord.js");
const Color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "eval",
    category: "Owner",
  aliases: ["e", "ev"],
    usage: "ev <text>",
    description: "evals the text",
    run: async (client, message, args) => {
     if (message.author.id !== '728590937441304586') return message.channel.send("You do not have permission to use this command!");
        const embed = new Discord.MessageEmbed()
            .setTitle('Evaluating...')
        const msg = await message.channel.send(embed);
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
             console.log(data); 
            const embed = new Discord.MessageEmbed()
                .setTitle('Eval')
                .setDescription(`**INPUT:-** \n ${args[0]} \n \n **OUTPUT:-** ${data}`)
            .setColor('GREEN')
            await msg.edit(embed)
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (e) {
            const embed = new Discord.MessageEmbed()
                .setTitle('error')
                .setDescription(e)
                .setColor("#FF0000")
            return await msg.edit(embed);
        }
   
    }
}