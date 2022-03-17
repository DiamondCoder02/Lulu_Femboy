//basic loaders
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json');
require('dotenv').config();
var token = process.env.token;
const client = new Client({ ws: {properties: {$browser: 'Discord iOS'}}, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["CHANNEL"] });
client.commands = new Collection();
//command file reader
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
//event handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//Slash command handler
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand) {
        //Check commands
        const command2 = client.commands.get(interaction.commandName);
        if (!command2) return;
        //Check dm
        if (interaction.channel.type == 'DM') {return interaction.reply("(* ￣︿￣)) Executing in DMs are temporarly disabled. Please use commands on servers.")}
        //try execute command
        try {
            await command2.execute(interaction, client, config);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral:true});
        }
    }
});
//console.log(client)
//client.on("error", (e) => console.error(e))
//client.on("warn", (e) => console.warn(e))
//client.on("debug", (e) => console.info(e))
try{
    if (config.Token == "token") client.login(token)
    else client.login(config.Token)
}catch{console.log("Please provide a bot token.")}