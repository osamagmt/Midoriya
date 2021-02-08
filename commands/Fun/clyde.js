const Discord = require("discord.js");
const Color = `RANDOM`;
const fetch = require('node-fetch')
const db = require('wio.db')
module.exports = {
    name: "clyde",
    category: "Fun",
  aliases: ["cly"],
    usage: "Clyde <text>",
    description: "Show your message as clyde's message",
    run: async (client, message, args) => {

        const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				':x: Please provide valid text.',
			);
		}

		const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(':x: An error occured, please try again!');
		}
		const attachment = new Discord.MessageAttachment(response.message, 'clyde.png');
		return message.channel.send(attachment);
    }
}