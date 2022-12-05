console.clear();
//basic loaders
const fs = require('fs'), { Client, Collection, GatewayIntentBits, Partials, userMention } = require('discord.js'), config = require('./botConfigs/config.json');
const client = new Client({ 
    ws: {
        properties: { browser: 'Discord Android' }
    }, 
    intents: [
        GatewayIntentBits.Guilds, //1
        GatewayIntentBits.GuildMembers, //2
        GatewayIntentBits.GuildBans, //4
        GatewayIntentBits.GuildEmojisAndStickers, //8
        GatewayIntentBits.GuildIntegrations, //16
        //GatewayIntentBits.GuildWebhooks, //32
        GatewayIntentBits.GuildInvites, //64
        GatewayIntentBits.GuildVoiceStates, //128
        GatewayIntentBits.GuildPresences, //256
        GatewayIntentBits.GuildMessages, //512
        GatewayIntentBits.GuildMessageReactions, //1024
        //GatewayIntentBits.GuildMessageTyping, //2048
        GatewayIntentBits.DirectMessages, //4096
        GatewayIntentBits.DirectMessageReactions, //8192
        //GatewayIntentBits.DirectMessageTyping //16384
        GatewayIntentBits.MessageContent, //32768
        GatewayIntentBits.GuildScheduledEvents, //65536
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
        welcomeMessage: "**Welcome to the server!** \nHope you enjoy your stay! \nThe bot works with only slash commands.\n(nsfw only in nsfw channels)",
        enableNSFW: false,
        welcomeRoles: [],
        freeRoles: [],
        moderationChannel: "",
        enableBotUpdateMessage: true,
        enableRandomReactions: false,
        randomReactionChannelBlacklist: [],
        singleChannelMessageLogger: [],
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