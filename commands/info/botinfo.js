module.exports = {
name: "botinfo",
aliases:['intro'],
description: "shows bot info",
usage: `botinfo`,
category: "info",

run: async (client, message, args) => {

    const Discord = require('discord.js')
    var os = require('bot-utils')
    const oo = require('os')
 const usedd = process.memoryUsage().heapUsed / 1024 / 1024;
 const used = `${Math.round(usedd * 100) / 100} MB`
var oss 	= require('os-utils');
const cpus = oo.cpus();
const cpuu = cpus[0];

// Accumulate every CPU times values
const total = Object.values(cpuu.times).reduce(
    (acc, tv) => acc + tv, 0
);
const usage = process.cpuUsage();
const currentCPUUsage = (usage.user + usage.system) * 1000;
const cpuuu = `${Math.round(currentCPUUsage / total * 100)}`;
const cpu = cpuuu / 100;
const moment = require("moment");
require("moment-duration-format");
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

const embed = new Discord.MessageEmbed()
.setTitle('**BOT INFO**')
.setDescription(`Midoriya is a multipupose bot \n Bot name:- ${client.user.username} \n Bot Owner:- ЄXƬ || ᴳᵒᵈl๏ภel𝕪#2099\n CPU: ${cpu}%\nMemory:- ${used}\nUptime:- ${duration}\nServers:- ${client.guilds.cache.size}\n NOTE:- The credits of the invite manager and logo gen goes to [Dark Studio](https://discord.gg/devs) `)
.setColor('RANDOM')
.setTimestamp();
message.channel.send(embed)
}
}