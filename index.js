const Discord = require('discord.js');
//const config = require('./config/config.json');
require("dotenv").config();
const token = process.env.CLIENT_TOKEN;

const fs = require('fs');
require('colors')
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.MessageContent,
  ],
  partials:[Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction, Discord.Partials.GuildMember, Discord.Partials.User],
})


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.slashcommands = new Discord.Collection();
fs.readdirSync('./handlers').filter(handler => handler.endsWith(".js")).forEach(handler => {
  try {
    require(`./handlers/${handler}`)(client, Discord)
  } catch (e) {
    console.warn(e);
  }
})

client.login(token);