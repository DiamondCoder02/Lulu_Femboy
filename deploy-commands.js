const fs = require('fs'), { REST } = require('@discordjs/rest'), { Routes } = require('discord-api-types/v9'), { clientId, Token } = require('./config.json');
const commands = [], commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('dotenv').config();
var token = process.env.token;
var cId =process.env.cId
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON())
}
try { if (Token !== "token") var t = Token; else var t = token} catch {console.log("Please provide a bot token.")}
try { if (clientId !== "clientID") var c = clientId; else var c = cId} catch {console.log("Please provide a ClientID.")}
const rest = new REST({ version: '9' }).setToken(t);
rest.put(Routes.applicationCommands(c), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);