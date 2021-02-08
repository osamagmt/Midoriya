const db = require('quick.db')
module.exports = {
        name: 'disablechatbotchannel',
        description: 'Disables a ChatBot Channel',
        aliases: ["disablechatchannel"],
        usage: 'disablechatbotchannel <channel>',
        category: 'Config',
 
    run: async (client, message, args) => {
        const Color = "RANDOM"
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
                color: Color,
            title: `:warning: You do not have the required Permissions! - [MANAGE_GUILD] `
        }})
    try {
        let a = db.fetch(`chatbot_${message.guild.id}`)

        if (!a) {
            return message.channel.send({embed: {
            color: Color,
            title:  ` :warning: There is no ChatBot channel set to Disable! `
        }})
        } else {
            let channel = message.guild.channels.cache.get(a)
           // client.guilds.cache.get(message.guild.id).channels.cache.get(channel.ID).send(`** ${emote.verified} ChatBot Channel Disabled!**`)
            db.delete(`chatbot_${message.guild.id}`)
    
            message.channel.send({embed: {
            color: Color,
            title: `:white_check_mark: ChatBot Channel has been Succesfully Disabled! `
        }})
        }
        return;
    } catch(err) {
        console.log(err)
        return message.channel.send(`${emote.error} Error - Missing Permissions or Channel Doesn't Exist`)
    }
    }
    }