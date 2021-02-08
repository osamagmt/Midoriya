const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
  name: "nuke",
  category: "Moderation",
  aliases: ["no aliases"],
  description: "nuke a channel",
  usage: "nuke",
  run: async (client, message, args) => {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You Don't Have Permission!");
  
  //Sends A MEssage Before Nuking The Channel
  message.channel.send('**Nuking...**')
  
  //clones the channel
  await message.channel.clone().then
 
  //makes sure the cloned channel is placed in the correct place
  ((ch) =>{ch.setParent(message.channel.parent.id);
 
  //setting up in clone location 
  ch.setPosition(message.channel.position);
 
  //deleteing channel after doing clone work
   message.channel.delete().then
 
  //sending nuked message to the channel 
  let embed = new Discord.MessageEmbed()
  .setTitle("Channel Has Been Nuked! 💥")
  .setImage('https://imgur.com/LIyGeCR')
  .setColor("FF6A00")
  .setTimestamp()
  .setFooter("Channel was nuked ");
           
  (ch.send(embed))
  })
  }


    //End
  
};