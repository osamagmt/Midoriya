const Discord = require("discord.js");
const fs = require("fs");
const db2 = require("wio.db");
const client = new Discord.Client({
   partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const { doesNotReject } = require('assert');

const discord = require('discord.js')
const { Default_Prefix, Token, Support, Color } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();
const db = require("quick.db");
client.invites = new Map();
client.on("inviteCreate", async invite => {
    client.invites.set(invite.guild.id, await invite.guild.fetchInvites())
}
  );

  const config = require('./config.js')
client.on("ready", async () => {
  console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);
  client.user.setActivity(
    `in ${client.guilds.cache.size} servers || ,help`,
    { type: "STREAMING" }
  );
  client.guilds.cache.forEach(guild => {
      guild
        .fetchInvites()
        .then(invites => client.invites.set(guild.id, invites))
        .catch(err => console.log(err));
    });
    
     
});

const express = require('express');
const app = express();
app.get("/", (req, res) => {
  res.status(200).send({success: "true"});
});
app.listen(process.env.PORT || 3000);
const path = require('path');
const canvas = require('discord-canvas'),
    welcomeCanvas = new canvas.Welcome(),
    leaveCanvas = new canvas.Goodbye()
let modules = ["Config", "Music", "Other", "Moderation", "Fun", "NSFW", "Giveaways", "Utility", "Owner", "Economy", "invites", "info", "Logo"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(error, files) {
    if (error) return new Error(`${error}`);
    files.forEach(function(file) {
      if (!file.endsWith(".js"))
        throw new Error(`A File Does Not End With .js!`);
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} Has Been Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases.length === 0) command.aliases = null;
    });
  });
});


client.on("message", async message => {
      let Prefix = await db2.fetch(`Prefix_${message.guild.id}`);
  if (!Prefix) Prefix = Default_Prefix;
      const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${Prefix}\``);
  }
  if (message.author.bot) return;
if(message.webhookID) return;
if(message.content === ",") return;


  let afk = new db.table("AFKs"),
      authorStatus = await afk.fetch(`${message.author.id}_${message.guild.id}`),
      mentioned = message.mentions.members.first();
  
  if (mentioned) {
    let status = await afk.fetch(`${mentioned.id}_${message.guild.id}`);
    
    if (status) {
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`${mentioned.user.tag} is AFK: **${status}**`)
      message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    }
  }
    
    if (authorStatus) {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Welcome back! **${message.author.tag}** your are no longer AFK.`)
    message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    afk.delete(`${message.author.id}_${message.guild.id}`)
        message.member.setNickname(message.member.user.username)
  }

  if (!message.content.startsWith(Prefix)) return;

  let args = message.content
    .slice(Prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if(command === 'no aliases' || command === 'No aliases') return;

  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;

  if (!command) return;


    if (command) {
      command.run(client, message, args);
    }
  

 })
        

const mongoPath = "mongodb+srv://SambitOp:UZtgrCxAyND2Sfm7@cluster0.tvh4e.mongodb.net/devil?retryWrites=true&w=majority"

const {
  GiveawaysManager
} = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#ff0000",
    reaction: "🎉"
  }
});
client.giveawaysManager = manager;
client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  if (member.user.bot) return;
  let conditionRole;

  let conditionsRoles = require(path.resolve(path.join(__dirname + '/database/conditionRole.json')));
  if (conditionsRoles[giveaway.messageID]) {
    conditionRole = conditionsRoles[giveaway.messageID].conditionRole;
  }
  if (conditionRole != 'none') {
    if (member.roles.cache.find(r => r.id === conditionRole)) {
      member.send(
        new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({
          format: 'png',
          dynamic: 'true'
        }))
        .setColor('GREEN')
        .setDescription(`Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been approved. **Good luck !**`)
        .setFooter(`Giveaway by ${reaction.message.author.tag}`)
        .setTimestamp()
      );
      return;
    } else {
      reaction.users.remove(member.id)
      let role = reaction.message.guild.roles.cache.find(r => r.id === conditionRole);
      member.send(
        new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({
          format: 'png',
          dynamic: 'true'
        }))
        .setColor('RED')
        .setDescription(`Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been denied. To enter, you need the \`${role.name}\` role.`)
        .setFooter(`Giveaway by ${reaction.message.author.tag}`)
        .setTimestamp()
      );
      return;
    }
  }

});
const { webhookID, webhookToken } = require('./config.js')
client.statusHook = new Discord.WebhookClient(webhookID, webhookToken)

//Shard ready
client.on("shardReady", async shard => {
    client.statusHook.send(`Shard **#${shard}** ready on **${client.guilds.cache.size}** servers and **${client.users.cache.size}** users.`)
})

//Shard disconnect
client.on("shardDisconnect", async shard => {
  await client.statusHook.send(`Shard **#${shard}** disconnected from its servers and users temporarily...`)
})

//Shard reconnecting
client.on("shardReconnecting", async shard => {
    client.statusHook.send(`Shard **#${shard}** reconnection in progress on the servers containing this shard...`)
})

//Shard resume
client.on("shardResume", async shard => {
    client.statusHook.send(`Shard **#${shard}** successfully reconnected to **${client.guilds.cache.size}** servers and **${client.users.cache.size}** users.`)
})
client.snipes = new Map();
client.on('messageDelete', function(message, channel){
client.snipes.set(message.channel.id,{
    content:message.content,
    author:message.author.username,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
})
})
 


async function g() {
console.log(client.guilds.size);

const res = await client.shard.fetchClientValues('guilds.size');
console.log(res);
}

const getServerCount = async () => {
    // get guild collection size from all the shards
    const req = await client.shard.fetchClientValues('guilds.size');

    // return the added value
    return req.reduce((p, n) => p + n, 0);
}

async function e() {
const resq = await client.shard.broadcastEval(client.guilds.cache.map((guild) => guild.members.size));
console.log(resq);
}
e()
g()
client.on("message", async message => {
   const fetch = require('node-fetch')
  let channel = await db.fetch(`chatbot_${message.guild.id}`);
     if(!channel) return;
        var sChannel = message.guild.channels.cache.get(channel);
     if (message.author.bot || sChannel.id !== message.channel.id) return;
if(message.webhookID) return;
     message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
     if (message.content.includes(`@`)) {
        return sChannel.send(`**:x: Please dont mention anyone**`);
     }
        sChannel.startTyping();
let content = message.content;
await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${content}&botname=Midoriya&ownername=Lonely&user=1`).then(res => res.json()).then(data => sChannel.send(`**${message.author.tag}**:- ${data.message}`))
sChannel.stopTyping();
}
)
  client.on("guildMemberAdd", async member => {
    const catchedInvites = client.invites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  client.invites.set(member.guild.id, newInvites);
  try {
    const usedInvite = newInvites.find(
      inv => catchedInvites.get(inv.code).uses < inv.uses
    );
  if(!usedInvite) {
      let vanity = config.unkown.split("{user}")
      .join(client.users.cache.get(member.id).username)
      .split("{inviter}")
      .join(client.users.cache.get(usedInvite.inviter.id).username)
      .split("{invites}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.invites`))
      .split("{total}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.regular`))
      .split("{leaves}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.leaves`))
      .split("{jointimes}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.joins`))
       member.guild.channels.cache.get(join).send(vanity)
    let user = db.fetch(`invites_${member.guild.id}_${member.id}`)
    if(!user) {
    let data = { 
      invites: 0,
      regular: 0,
      leaves: 0,
      joins: 0,
      by: client.users.cache.get(usedInvite.inviter.id).username,
      bouns: 0   
    }
    db.set(`invites_${member.guild.id}_${member.id}`, data) 
    }
    }
      if(!usedInvite) return;
    db.add(`invites_${member.guild.id}_${member.id}.joins`, 1)
    let invites = db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}`)
    if(!invites) {
      let brr = { 
        invites: 0,
        regular: 0,
        leaves: 0,
        joins: 0,
        by: client.users.cache.get(usedInvite.inviter.id).username,
        bouns: 0   
      }
      db.set(`invites_${member.guild.id}_${usedInvite.inviter.id}`, brr)
    }
    db.set(`author_${member.guild.id}_${member.id}`, usedInvite.inviter.id);  
    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}.invites`, 1)

    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}.regular`, 1)
    
    let join = db.get(`join_channel_${member.guild.id}`)
    let customize = db.get(`join_message_${member.guild.id}`)
    if(!customize) customize = config.join
    if(!join) return;
    let splita = customize
    .split("{user}")
     .join(client.users.cache.get(member.id).username)
      .split("{inviter}")
      .join(client.users.cache.get(usedInvite.inviter.id).username)
      .split("{invites}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.invites`))
      .split("{total}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.regular`))
      .split("{leaves}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.leaves`))
      .split("{jointimes}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.joins`))
     member.guild.channels.cache.get(join).send(splita)
 
  } catch (err) {
  console.log(err)
  }
  })
   client.on("guildMemberRemove", member => {
    try {
  let user = db.fetch(`author_${member.guild.id}_${member.id}`)
  if(!user) {
   let channel = db.fetch(`leave_channel_${member.guild.id}`)
   if(!channel) return;
   member.guild.channels.cache.get(channel).send(`${member.username} has left, but i can't figure out who invited him.`)
   return
  }

  let channel = db.fetch(`leave_channel_${member.guild.id}`)
  if(!channel) return;
  let leave = db.fetch(`leave_message_${member.guild.id}`)
  if(!leave) leave = config.leave;
  db.add(`invites_${member.guild.id}_${user}.leaves`, 1)
  db.subtract(`invites_${member.guild.id}_${user}.invites`, 1)
  let com = leave.split("{user}")
     .join(client.users.cache.get(member.id).username)
      .split("{inviter}")
      .join(client.users.cache.get(usedInvite.inviter.id).username)
      .split("{invites}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.invites`))
      .split("{total}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.regular`))
      .split("{leaves}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.leaves`))
      .split("{jointimes}")
      .join(db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}.joins`))

  member.guild.channels.cache.get(channel).send(com)
     } catch(err) {
      console.log(err)
    }
  })


 setInterval(() => {
client.guilds.cache.forEach(x =>{
  let ranks = db.fetch(`ranks_${x.id}`)
  if(!ranks) return;
  x.members.cache.forEach(o => {
  if(o.user.bot === true) return;
    let invites = db.fetch(`invites_${x.id}_${o.id}`)
    if(!invites) {
      let data = {
        invites: 0,
        regular: 0,
        leaves: 0,
        joins: 0,
        by: null,
        bouns: 0       
      }
      db.set(`invites_${x.id}_${o.id}`, data)
    return; 
    }    
    ranks.forEach(r => {
      let g = x.roles.cache.get(r.role)
if(!g) return;
x.members.fetch(o.id).then(member => {  
if(invites.invites > r.invites-1) {
       if(member.roles.cache.has(r.role)) return
        member.roles.add(r.role, { reason: "has enough invites" })
       db.set(`r_${x.id}_${o.id}_${r.role}`, true)
    }
    if(invites.invites < r.invites-1) {
      console.log(member.user.username)
      if(member.roles.cache.has(r.role)) {
        let check = db.get(`r_${x.id}_${o.id}_${r.role}`)
        if(!check) return;
        member.roles.remove(r.role, { reason: "don't have enough invites for the role"})
        db.delete(`r_${x.id}_${o.id}_${r.role}`)
      } 
      }
    })
    })
  })
})
 }, 5500);
 setInterval(() => {
     client.destroy()
    .then(() => client.login(Token)).then(() => console.log("Bot has been Restarted")).then(() => client.user.setActivity(`in ${client.guilds.cache.size} servers || ,help`,
    { type: "STREAMING" }))
 }, 43200000)
client.on('guildCreate', (guild) => {

    const joinembed = new Discord.MessageEmbed()
    .setTitle(`📥 Guild Joined`)
    .setColor(`#0ff020`)
    .addField(`Guild Name:` , `${guild.name}`)
    .addField(`Guild Members:` , `${guild.members.cache.size}`)
    .addField(`Guild Id:` , `${guild.id}`)
    .addField(`Guild Owner:` , `${guild.owner} | Id: ${guild.ownerID}`)
    .setFooter(`New Guild Size: ${client.guilds.cache.size} Servers |`)
    .setTimestamp()
    .setThumbnail(guild.iconURL())

client.user.setActivity( `in ${client.guilds.cache.size} servers || ,help`,
    { type: "STREAMING" })
    let botjoinmessagechannel = '802060687421341746' //-----Put the channel id where u want to send the join message

    const sendchannel = client.channels.cache.get(botjoinmessagechannel)
    if(!sendchannel) return ;

    sendchannel.send(joinembed)
}
)
client
  .login(Token)
  .catch(() =>
    console.log(`Invalid Token Is Provided - Please Give Valid Token!`)
  );