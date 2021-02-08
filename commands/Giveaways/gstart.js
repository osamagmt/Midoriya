const Discord = require("discord.js");
const Color = `RANDOM`;
const fs = require('fs')
const path = require('path')
const ms = require('ms')
const db = require('wio.db')
module.exports = {
    name: "gstart",
    category: "Giveaway",
  aliases: ["giveawaystart"],
    usage: "gstart",
    description: "start a giveaway",
    run: async (client, message, args) => {
  let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');

  let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
  if (!Prefix) Prefix = ",";

    if (hasPerm === false) {
        return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(':x:**ERROR**:x:')
            .setColor('RED')
            .setDescription('You need `MANAGE_MESSAGES` permissions to start an giveaway')
            .setTimestamp()
        )
    }

    if (!args[0]) {
        return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(':x:**ERROR**:x:')
            .setColor('RED')
            .setDescription('Please enter a giveaway duration.\n\n**Example** : \`gstart 1m 1 Nitro Classic`')
            .setTimestamp()
        )
    }

    if (!args[1]) {
        return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(':x:**ERROR**:x:')
            .setColor('RED')
            .setDescription('Please, enter the number of winners.\n\n**Example** : \`gstart 1m 1 Nitro Classic`')
            .setTimestamp()
        )
    }

    if (!args[2]) {
        return message.channel.send(
            new Discord.MessageEmbed()
              .setTitle(':x:**ERROR**:x:')
            .setColor('RED')
            .setDescription('Please, enter the giveaway gift.\n\n__Example__ : `gstart 1m 1 Nitro Classic`')
            .setTimestamp()
        )
    }

    message.delete();

    let embed = await message.channel.send(
        new Discord.MessageEmbed()
        .setTitle('**FINALISATION**')
        .setColor('RANDOM')
        .setDescription('__Do you want to add restrictions?__\n\n`<roleID>`・Need to have a role to enter\n``no``・Launch giveaway !\n\nTo add restrictions, enter the guild id after this message.')
    )
    let error = false;
    let id;
    await message.channel.awaitMessages(m => m.author.id === message.author.id, {
        max: 1,
        time: 60000,
        errors: ["time"]
    }).then(collected => {
        id = collected.first().content;
        collected.first().delete()
    }).catch((err) => {
        error = true;
        embed.edit(
            new Discord.MessageEmbed()
            .setTitle('**ERROR**')
            .setColor('RANDOM')
            .setDescription("You didn't enter a message. Cancelling giveaway...")
            .setTimestamp()
        );
        return;
    });
    if (error) return;
    if (id.toLowerCase() === 'no') {
        let giveawayMessage = await client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1]),
            messages: {
            giveaway: ":gift:  **GIVEAWAY** :gift: ",
                giveawayEnded: ":gift:   **GIVEAWAY ENDED**:gift:  ",
                timeRemaining: `\n <:emoji_8:792468572789669928> ・Time left: **{duration}**!\n <:emoji_9:792469328649519114> ・Hosted by: ${message.author}\n <:emoji_10:792469660666691584> ・Winner(s): ${parseInt(args[1])}`,
                inviteToParticipate: "React with 🎉to enter!",
                winMessage: ":tada: ・Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: `\`⛔\`・There are no correct participations.\n <:emoji_9:792469328649519114> ・Hosted by: ${message.author}`,
                winners: `🎁・Winner(s)`,
                endedAt: "Ended",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        });
        let conditionsRoles = require(path.resolve(path.join('./database/conditionRole.json')));
        conditionsRoles[giveawayMessage.messageID] = {
            conditionRole: 'none'
        }
        fs.writeFile(path.resolve(path.join('./database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
            if (err) console.log(err)
        });
        return;
    }
    let role = message.guild.roles.cache.find(r => r.id === id);
    if (!role) {
        return embed.edit(
            new Discord.MessageEmbed()
            .setTitle('**ERROR**')
            .setColor('BLUE')
            .setDescription(`I can't find the role - Be sure you enter the correct role ID.`)
        )
    }
    embed.delete()
    let giveawayMessage = await client.giveawaysManager.start(message.channel, {
        time: ms(args[0]),
        prize: args.slice(2).join(" "),
        winnerCount: parseInt(args[1]),
        messages: {
          giveaway: ":gift:  **GIVEAWAY**:gift:  ",
                giveawayEnded: ":gift:   **GIVEAWAY ENDED** :gift:  ",
                timeRemaining: `\n <:emoji_8:792468572789669928> ・Time left: **{duration}**!\n <:emoji_9:792469328649519114> ・Hosted by: ${message.author}\n <:emoji_10:792469660666691584> ・Winner(s): ${parseInt(args[1])}`,
                inviteToParticipate: "React with 🎁 to enter!",
                winMessage: ":tada: ・Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: `\`⛔\`・There are no correct participations.\n <:emoji_9:792469328649519114> ・Hosted by: ${message.author}`,
                winners: `🎁・Winner(s)`,
                endedAt: "Ended",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });

    if (message.guild.roles.cache.find(r => r.id === id)) {
        let role = message.guild.roles.cache.find(r => r.id === id);

        let conditionsRoles = require(path.resolve(path.join('./database/conditionRole.json')));
        conditionsRoles[giveawayMessage.messageID] = {
            conditionRole: 'none'
        }
        fs.writeFile(path.resolve(path.join('./database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
            if (err) console.log(err)
        });
        let conditionRole = conditionsRoles[giveawayMessage.messageID].conditionsRoles;

        conditionsRoles[giveawayMessage.messageID] = {
            conditionRole: role.id
        }
        fs.writeFile(path.resolve(path.join('./database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
            if (err) console.log(err)
        });

        const embed = new Discord.MessageEmbed()
            .setTitle('**CONDITION**')
            .setColor('RANDOM')
            .setDescription('To enter, you need the <@&' + role.id + '> rôle.')
        message.channel.send(embed)
    }
    }
}