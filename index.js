console.clear();
//basic loaders
const fs = require('fs'), { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js'), config = require('./botConfigs/config.json');
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
        //FUCK GatewayIntentBits.GuildPresences, //256
        //FUCK GatewayIntentBits.GuildMessages, //512
        GatewayIntentBits.GuildMessageReactions, //1024
        //GatewayIntentBits.GuildMessageTyping, //2048
        GatewayIntentBits.DirectMessages, //4096
        GatewayIntentBits.DirectMessageReactions, //8192
        //GatewayIntentBits.DirectMessageTyping //16384
        //FUCK GatewayIntentBits.MessageContent, //32768
        GatewayIntentBits.GuildScheduledEvents, //65536
        GatewayIntentBits.AutoModerationConfiguration, //1048576
        GatewayIntentBits.AutoModerationExecution //2097152
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
        messageLogsBlacklistChannel: [],
        messageLogsBlacklistRoles: [],
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
        redditFeed: false,
        redditFeedSub1: "",
        lastRedditFeedPost1: "",
        redditFeedChannel1: "",
        redditFeedSub2: "",
        lastRedditFeedPost2: "",
        redditFeedChannel2: "",
        redditFeedSub3: "",
        lastRedditFeedPost3: "",
        redditFeedChannel3: "",
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

let redditFeedSub = []
let redditFeedChannel = []
setInterval(() => {
    client.guilds.cache.forEach(guild => {
        let tr = client.settings.get(guild.id, "redditFeed")
        if (!tr) return;
        redditFeedSub[0] = client.settings.get(guild.id, "redditFeedSub1")
        redditFeedSub[1] = client.settings.get(guild.id, "redditFeedSub2")
        redditFeedSub[2] = client.settings.get(guild.id, "redditFeedSub3")
        redditFeedChannel[0] = client.settings.get(guild.id, "redditFeedChannel1")
        redditFeedChannel[1] = client.settings.get(guild.id, "redditFeedChannel2")
        redditFeedChannel[2] = client.settings.get(guild.id, "redditFeedChannel3")
        for (i = 0; i < redditFeedSub.length; i++){
            if (redditFeedSub[i] == '') return;
            if (redditFeedChannel[i] == '') return;
            else { redditFetchFunction(redditFeedChannel[i], redditFeedSub[i], i, guild) }
        }
    })
}, 240000)
async function redditFetchFunction(channel, sub, i, guild) {
    let feedChannel = await client.channels.cache.get(channel)
    if (feedChannel == undefined) return;
    let post = await fetch(`https://www.reddit.com/r/${sub}/new.json`)
        .then(res => res.json()).then(body => {
            let found = body.data.children;
            if (!found.length) return channel.send(`Unable to find a post. The subreddit "${subreddit}" does not exist, or it has no available post data.`);
            return found[0].data;
        })
    if (i == 0) {
        let lastID = client.settings.get(guild.id, "lastRedditFeedPost1")
        if (lastID == post.id) return;
        else { client.settings.set(guild.id, post.id, "lastRedditFeedPost1") }
    } else if (i == 1) {
        let lastID = client.settings.get(guild.id, "lastRedditFeedPost2")
        if (lastID == post.id) return;
        else { client.settings.set(guild.id, post.id, "lastRedditFeedPost2") }
    } else if (i == 2) {
        let lastID = client.settings.get(guild.id, "lastRedditFeedPost3")
        if (lastID == post.id) return;
        else { client.settings.set(guild.id, post.id, "lastRedditFeedPost3") }
    } else return;
    //console.log(post)
    const embed = new EmbedBuilder()
        .setColor('#A020F0')
        .setTitle(post.title)
        .setURL(`https://reddit.com${post.permalink}`)
        .setAuthor({ name: post.author})
        .setTimestamp()
    const linkButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel('Link')
            .setStyle(ButtonStyle.Link)
            .setEmoji('🖥️')
            .setURL(`https://reddit.com${post.permalink}`)
    )
    if (post.url != null) { 
        embed.setImage(post.url)
        feedChannel.send({embeds: [embed], components: [linkButton]})
    }
    else {
        feedChannel.send({embeds: [embed], components: [linkButton]})
    }
}