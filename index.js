console.clear();
//basic loaders
const fs = require('fs'), { Client, Collection, GatewayIntentBits, Partials, userMention } = require('discord.js'), config = require('./config.json');
const client = new Client({ 
    ws: {
        properties: {$browser: 'Discord Android'}
    }, 
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        //GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        //GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        //GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel, 
        Partials.GuildMember, 
        Partials.GuildScheduledEvent, 
        Partials.Message, 
        Partials.Reaction, 
        Partials.User, 
        //Partials.ThreadMember
    ]
});
require('dotenv').config(); var token = process.env.token;
client.commands = new Collection();
//Enmap - server side settings
const Enmap = require('enmap');
client.settings = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep',
    autoEnsure: {
        welcome: false,
        welcomeUserCheck: false,
        goodbye: false,
        messageLogs: false,
        memberUpdateLogs: false,
        invitesLogs: false,
        schedulesLogs: false,
        banKickLogs: false,
        welcomeMessage: "**Welcome to the server!** \nHope you enjoy your stay!",
        enableNSFW: false,
        welcomeRoles: [],
        freeRoles: [],
        moderationChannel: "",
        enableRandomReactions: false,
        randomReactionChannelBlacklist: [],
    }
});

let commandFuck = []
//command file reader
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command_files = require(`./commands/${file}`);
	client.commands.set(command_files.data.name, command_files);
    commandFuck.push(command_files)
}

//event handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const guildInvites = new Map()
const vanityInvites = new Map()
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {client.once(event.name, (...args) => event.execute(...args, client, guildInvites, vanityInvites))} 
    else {client.on(event.name, (...args) => event.execute(...args, client, guildInvites, vanityInvites))}
}

const dashboardInit = require(`./dashboard/dashInit.js`)
client.on(`ready`, (...args) => dashboardInit.execute(...args, client, commandFuck))

//Bot token
try{ if (config.Token == "token") { client.login(token) } else client.login(config.Token) }catch{console.log("Please provide a bot token.")}

//error handler
console.log(client)
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
process.on('unhandledRejection', error => console.error('-----\nUncaught Rejection:\n-----\n', error));
process.on('uncaughtException', error => console.error('-----\nUncaught Exception:\n-----\n', error));
if (config.debug_level >= 3) { 
    client.on("debug", (e) => console.log(e))
}