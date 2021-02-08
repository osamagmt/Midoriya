const Discord = require("discord.js");
const Color = `RANDOM`;
const fetch = require('node-fetch')
const db = require('wio.db')
const axios = require('axios')
module.exports = {
    name: "binary",
    category: "Fun",
  aliases: ["No aliases"],
    usage: "binary <text>",
    description: "Show your message as binary",
    run: async (client, message, args) => {
        const url = `http://some-random-api.ml/binary?text=${args}`;

  let response, data;
  try {
    response = await axios.get(url);
    data = response.data;
  } catch (e) {
    return message.channel.send(`An error occured, please try again!`);
  }
  const kek = await message.channel.send(`Binary Code:- \n ${data.binary}`)
    }
    }