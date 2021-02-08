const Discord = require("discord.js");
const Color = `RANDOM`;
const canvacord = require('canvacord');
const fetch = require('node-fetch')
const  db  = require('quick.db')
module.exports = {
    name: "npm",
    category: "Utility",
  aliases: ["pacakge"],
    usage: "npm <text>",
    description: "pacakge information",
    run: async (client, message, args) => {
   const packageg = args[0];
        if(!packageg) {
            return message.channel.send(
                'Please provide a valid package.',
            );
        }

        let response;
        try {
            response = await fetch('https://api.npms.io/v2/search?q=' + args[0]).then(res => res.json());
        }
        catch (e) {
            return message.channel.send(
                'An error occured, please try again!',
            );
        }

        try{
            const pkg = response.results[0].package;
            const embed = new Discord.MessageEmbed()
                .setTitle(pkg.name)
                .setThumbnail('https://images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png')
                .setURL(pkg.links.npm)
                .setDescription(pkg.description)
                .addFields(
                    { name: 'Author :', value: pkg.author ? pkg.author.name : 'None' },
                    { name: 'Version :', value: pkg.version },
                    { name: 'Repository :', value: pkg.links.repository ? pkg.links.repository : 'None' },
                    { name: 'Keywords :', value: pkg.keywords ? pkg.keywords.join(', ') : 'None' },
                )
                .setColor('FF0000')
                                .setTimestamp();

            message.channel.send(embed);
        }
        catch (e) {
            return message.channel.send(
                'Please provide a valid package.',
            );
        }
    }
}