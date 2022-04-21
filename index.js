//basic loaders
const fs = require('fs'), { Client, Collection, Intents } = require('discord.js'), config = require('./config.json'), lang = require('./languages/' + config.language + '.json');
const cooldowns = new Collection();
require('dotenv').config(); var token = process.env.token;
const client = new Client({ ws: {properties: {$browser: 'Discord iOS'}}, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES], partials: ["CHANNEL"] });
client.commands = new Collection();
console.clear();

//command file reader
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command_files = require(`./commands/${file}`);
	client.commands.set(command_files.data.name, command_files);
}

//event handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {client.once(event.name, (...args) => event.execute(...args))} 
    else {client.on(event.name, (...args) => event.execute(...args))}
}

//Slash command handler
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        //OnlyGuild
        if (command.guildOnly && interaction.channel.type === 'DM') {return interaction.reply(lang.index.no_dm)}
        //Cooldown
        if (!cooldowns.has(interaction.commandName)) {cooldowns.set(interaction.commandName, new Collection());}
        const now = Date.now();
        const timestamps = cooldowns.get(interaction.commandName);
        const cooldownAmount = (command.cooldown || 1) * 1000;
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.reply({content: lang.index.cooldown + " `"+timeLeft+"`"});
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        //guild permission check
        if (command.guildOnly) { try{
                if (interaction.guild && interaction.channel.permissionsFor(interaction.member).has(command.permissions)) {r=true} else {r=false}
                if (!r && interaction.channel.type === "GUILD_TEXT") {return interaction.reply({content: lang.index.perm})}
        } catch { } }
        //Execute
        try {
            await command.execute(interaction, client, config, lang);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: lang.index.error, ephemeral:true});
        }
    }
});

//Bot token
try{
    if (config.Token == "token") client.login(token)
    else client.login(config.Token)
}catch{console.log(lang.index.token)}

//error handler
console.log(client)
process.on('unhandledRejection', error => console.error('-----\nUncaught Rejection:\n-----\n  ', error));
client.on("error", console.error)
client.on("warn", console.warn)
if (config.debug_level >= 3) {
    client.on("debug", console.log)
}