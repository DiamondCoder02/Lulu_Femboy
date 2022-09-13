console.clear();
//basic loaders
const fs = require('fs'), { Client, Collection, GatewayIntentBits, Partials, userMention } = require('discord.js'), config = require('./config.json'), lang = require('./languages/' + config.language + '.json');
const client = new Client({ 
    ws: {
        properties: {$browser: 'Discord iOS'}
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
    fetchAll: false,
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
        welcomeMessage: "Welcome to the server! Hope you enjoy your stay!",
        enableNSFW: false,
        welcomeRoles: [""],
        freeRoles: [""],
        moderationChannel: "",
    }
});

/*
client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
	if (reaction.partial) {
		try { await reaction.fetch(); } 
        catch (error) { return console.error('Something went wrong when fetching the message:', error); }
	}
    try {
        const u = await reaction.users.fetch(), us = u.map(u => u.id)
        if (reaction.emoji.name === "red_cross" && reaction.emoji.id === "1008725354296389723" && reaction.count === 2 && reaction.message.author.id === client.user.id && us.includes(client.user.id)) {
            reaction.message.delete()
        }
    } catch (error) { console.error("messageReactionAdd error", error); }
});
*/

//command file reader
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command_files = require(`./commands/${file}`);
	client.commands.set(command_files.data.name, command_files);
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

//Bot token
try{ if (config.Token == "token") { client.login(token) } else client.login(config.Token) }catch{console.log(lang.index.token)}

/* --- PRE_DASHBOARD --- */
const DarkDashboard = require('dbd-dark-dashboard');
const wait = require('node:timers/promises').setTimeout;

let langsSettings = {};

var cliId = process.env.cid;
var cliSecret = process.env.ClientSecret;
var dbd_key = process.env.dbd;
try{ if (config.clientId == "clientId") { clientID = String(cliId) } else clientID = String(config.clientId) }catch{ return console.log("clientID error")}
try{ if (config.clientSecret == "clientSecret") { cSec = cliSecret } else cSec = config.clientSecret }catch{ return console.log("clientSecret error")}
try{ if (config.dbd_license == "dbd_license") { dbd_lic = dbd_key } else dbd_lic = config.dbd_license }catch{ return console.log("dbd_license error")}

/* --- DASHBOARD --- */
(async ()=>{
    let DBD = require('discord-dashboard');
    await DBD.useLicense(dbd_lic);
    DBD.Dashboard = DBD.UpdatedClass();
    await wait(1000)
    const Dashboard = new DBD.Dashboard({
        port: 80,
        client: {
            id: client.user.id,
            secret: cSec
        },
        redirectUri: 'http://localhost/discord/callback',
        domain: 'http://localhost',
        bot: client,
        theme: DarkDashboard(DBD.default_configs.dbdDarkDashboard),
        settings: [
            {
                categoryId: 'setup',
                categoryName: "Setup",
                categoryDescription: "Setup your bot with default settings!",
                categoryOptionsList: [
                    {
                        optionId: 'lang',
                        optionName: "Language",
                        optionDescription: "Change bot's language easily",
                        optionType: DBD.formTypes.select({"Polish": 'pl', "English": 'en', "French": 'fr'}),
                        getActualSet: async ({guild}) => {
                            return langsSettings[guild.id] || null;
                        },
                        setNew: async ({guild,newData}) => {
                            langsSettings[guild.id] = newData;
                            return;
                        }
                    },
                ]
            },
        ]
    });
    Dashboard.init();
})();


//error handler
console.log(client)
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
process.on('unhandledRejection', error => console.error('-----\nUncaught Rejection:\n-----\n', error));
process.on('uncaughtException', error => console.error('-----\nUncaught Exception:\n-----\n', error));
if (config.debug_level >= 3) { 
    client.on("debug", (e) => console.log(e))
}