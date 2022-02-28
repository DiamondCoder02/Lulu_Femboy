const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, Token } = require('./config.json');
require('dotenv').config();
var token = process.env.token;
var cId =process.env.cId

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

try{
    if (Token !== "token") var t = Token
    else var t = token
}catch{console.log("Please provide a bot token.")}
try{
    if (clientId !== "clientID") var c = clientId
    else var c = cId
}catch{console.log("Please provide a ClientID.")}

const rest = new REST({ version: '9' }).setToken(t);

rest.put(Routes.applicationCommands(c), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);