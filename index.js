//basic loaders
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json');
require('dotenv').config();
var token = process.env.token;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
//command file reader
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
//Slash command handler
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand) {
        const command2 = client.commands.get(interaction.commandName);
        if (!command2) return;
        try {
            await command2.execute(interaction, client, config);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral:true});
        }
    }
});
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
console.log(client);
//client.on("error", (e) => console.error(e))
//client.on("warn", (e) => console.warn(e))
//client.on("debug", (e) => console.info(e))
console.log(commandFiles)
try{
    if (config.Token == "token") client.login(token)
    else client.login(config.Token)
}catch{console.log("Please provide a bot token.")}

/*
const Discord = require('discord.js'), cooldowns = new Discord.Collection(), fsp = require('fs').promises, path = require('path')
client.commands = new Discord.Collection();
client.commands= new Map();
// config and language load
const system = {Discord, client, config, fs};
(async function registerCommands(dir = 'commands2') {
    //read directory
    let files = await fsp.readdir(path.join(__dirname, dir));
    //loop through each file
    for(let file of files) {
        let stat = await fsp.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerCommands(path.join(dir, file));
        else{
            if(file.endsWith(".js")){
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);
            }
        }
    }
})()
client.on('message', async function(message){
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const cmdArgs = message.content.slice(config.prefix.length).trim().split(/ +/);
    let cmdName = cmdArgs.shift().toLowerCase();
    const command = client.commands.get(cmdName)
    console.log(cmdName, cmdArgs)
    //No command found
    if(!client.commands.get(cmdName)) {
        return message.reply("Sorry, what? \nThat is not a real command.")
    }
    //args 
    if (command.args && !cmdArgs.length) {
		let reply = `${message.author}` + ", No argument found";
		if (command.usage) {
			reply += "\nThe correct argument is:" + `\`${config.prefix}${cmdName} ${command.usage}\``;
        }
		return message.channel.send("Incorrect argument");
	}
    //server only check
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply("(* ￣︿￣)) Can not execute in DM");
    }
    //guild rank role
    if (!message.channel.type == "dm"){
        if (message.guild = (message.channel.permissionsFor(message.member).has(command.permissions))) {
            console.log("")
        } else {
            return message.reply("(* ￣︿￣)), wrong role permission")
        }
    }
    //Cooldown
    if (!cooldowns.has(cmdName)) {
        cooldowns.set(cmdName, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(cmdName);
    const cooldownAmount = (command.cooldown || 1) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`${cmdName}` + ", Time left in seconds: " + `${timeLeft.toFixed(1)}`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    //command execution
    command.execute(message, system, cmdArgs)
});
*/