console.clear();
//basic loaders
const fs = require('fs'), { Client, Collection, Intents } = require('discord.js'), config = require('./config.json'), lang = require('./languages/' + config.language + '.json');
const client = new Client({ 
    ws: {properties: {$browser: 'Discord iOS'}}, 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_BANS, 
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
        Intents.FLAGS.GUILD_INTEGRATIONS, 
        //Intents.FLAGS.GUILD_WEBHOOKS, 
        Intents.FLAGS.GUILD_INVITES, 
        Intents.FLAGS.GUILD_VOICE_STATES, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS
    ],
    partials: ["CHANNEL"]
});
require('dotenv').config(); var token = process.env.token;
const cooldowns = new Collection();
client.commands = new Collection();
//Enmap - server side settings
const Enmap = require('enmap');
client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep',
    autoEnsure: {
        welcome: true,
        goodbye: true,
        welcomeMessage: "Welcome to the server! Hope you enjoy your stay!",
        enableNSFW: false,
        welcomeRole: "",
        freeRoles: [""],
        moderationChannel: "",
    }
});

//command file reader
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command_files = require(`./commands/${file}`);
	client.commands.set(command_files.data.name, command_files);
}

//event handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const guildInvites = new Map()
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {client.once(event.name, (...args) => event.execute(...args, client, guildInvites))} 
    else {client.on(event.name, (...args) => event.execute(...args, client, guildInvites))}
}

//Slash command handler
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        //OnlyGuild
        if (command.guildOnly && interaction.channel.type === 'DM') {console.log("Execute in DMs, why?");return interaction.reply(lang.index.no_dm)}
        //Cooldown
        if (!cooldowns.has(interaction.commandName)) {cooldowns.set(interaction.commandName, new Collection());}
        const now = Date.now();
        const timestamps = cooldowns.get(interaction.commandName);
        const cooldownAmount = (command.cooldown || 1) * 1000;
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                console.log("Cooldown time left, maybe spam?");
                return interaction.reply({content: lang.index.cooldown + " `"+timeLeft+"`", ephemeral: true});
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        //guild permission check
        if (command.guildOnly) { 
            try{
                if (interaction.guild && interaction.channel.permissionsFor(interaction.member).has(command.permissions)) {r=true} else {r=false}
                if (!r && interaction.channel.type === "GUILD_TEXT") {console.log("Not enough permission, what was the plan?");return interaction.reply({content: lang.index.perm+" => `"+command.permissions+"`", ephemeral: true})}
            } catch { } 
        }
        //Execute
        try {
            await command.execute(interaction, client, config);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: lang.index.error, ephemeral:true});
        }
    }
});

//Bot token
try{ if (config.Token == "token") { client.login(token) } else client.login(config.Token) }catch{console.log(lang.index.token)}

//error handler
console.log(client)
process.on('unhandledRejection', error => console.error('-----\nUncaught Rejection:\n-----\n', error));
client.on("error", console.error)
client.on("warn", console.warn)
if (config.debug_level >= 3) { client.on("debug", console.log) }