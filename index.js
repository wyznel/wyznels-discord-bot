const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("hopefully this works!")
})

app.listen(3000, () => {
  console.log("Project is ready!")
})
// This is for the 24/7 bot requirements.

const Discord = require('discord.js');

const bot = new Discord.Client();

const prefix = '-';

const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);

}

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)

})

bot.on('message', message => {  
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'ping'){
        bot.commands.get('ping').execute(message, args);
    }
    if(command == 'youtube'){
        bot.commands.get('youtube').execute(message, args);
    }
    if(command == 'play'){
        bot.commands.get('play').execute(message, args);
    }
    if(command == 'leave'){
        bot.commands.get('leave').execute(message, args);
    }
})

bot.login("TOKEN GOES HERE")
