/* eslint-disable no-console */
console.clear();
require("dotenv").config();
let debug_level = process.env.debug_level;
const chalk = require("chalk"), today = new Date(), yyyy = today.getFullYear();
let mm = today.getMonth() + 1, dd = today.getDate(), hh = today.getHours(), min = today.getMinutes(), sec = today.getSeconds(); // Months start at 0!
if (dd < 10) {dd = "0" + dd} if (mm < 10) {mm = "0" + mm} if (hh < 10) {hh = "0" + hh} if (min < 10) {min = "0" + min} if (sec < 10) {sec = "0" + sec}
const formattedToday = yyyy+"-"+mm+"-"+dd+"_"+hh+"-"+min+"-"+sec;

require("better-logging")(console, {
	format: ctx => `${ctx.date}${ctx.time} ${ctx.type} ${ctx.msg}`,
	saveToFile: `./logs/${formattedToday}.log`,
	color: {
		base: chalk.greenBright,
		type: { error: chalk.bgRed, warn: chalk.red, info: chalk.yellow, log: chalk.gray, debug: chalk.redBright }
	}
});
console.logLevel = Number(debug_level);

const fs = require("fs"), { Client, GatewayIntentBits, Partials, Collection, ButtonStyle, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const client = new Client({
	ws: { properties: { browser: "Discord Android" } },
	intents: [
		GatewayIntentBits.Guilds, // 1
		GatewayIntentBits.GuildMembers, // 2
		GatewayIntentBits.GuildModeration, // 4
		GatewayIntentBits.GuildEmojisAndStickers, // 8
		// GatewayIntentBits.GuildIntegrations, // 16
		// GatewayIntentBits.GuildWebhooks, // 32
		GatewayIntentBits.GuildInvites, // 64
		// GatewayIntentBits.GuildVoiceStates, // 128
		// FUCK GatewayIntentBits.GuildPresences, // 256
		GatewayIntentBits.GuildMessages, // 512
		GatewayIntentBits.GuildMessageReactions, // 1024
		// GatewayIntentBits.GuildMessageTyping, // 2048
		GatewayIntentBits.DirectMessages, // 4096
		GatewayIntentBits.DirectMessageReactions, // 8192
		// GatewayIntentBits.DirectMessageTyping, //16384
		// FUCK GatewayIntentBits.MessageContent, // 32768
		GatewayIntentBits.GuildScheduledEvents // 65536
		// GatewayIntentBits.AutoModerationConfiguration, //1048576
		// GatewayIntentBits.AutoModerationExecution //2097152
	],
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.User
		// Partials.ThreadMember
	]
});

// Enmap - server side settings
const Enmap = require("enmap");
client.settings = new Enmap({
	name: "settings",
	fetchAll: true,
	autoFetch: true,
	cloneLevel: "deep",
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
		redditFeedChannel3: ""
	}
});

// Command file reader
client.commands = new Collection();
let commandFolders = fs.readdirSync("./commands");
let forDeploy = [];
for (const folder of commandFolders) {
	fs.readdir(`./commands/${folder}`, (err, files) => {
		if (err) {throw err}
		for (const file of files) {
			if (!file.endsWith(".js")) {continue}
			const command = require(`./commands/${folder}/${file}`);
			client.commands.set(command.data.name, command);
			forDeploy.push(command.data.toJSON());
		}
	});
}

// Event handler
const guildInvites = new Map();
const vanityInvites = new Map();
let eventFolders = fs.readdirSync("./events");
for (const folder of eventFolders) {
	fs.readdir(`./events/${folder}`, (err, files) => {
		if (err) {throw err}
		for (const file of files) {
			if (!file.endsWith(".js")) {continue}
			const event = require(`./events/${folder}/${file}`);
			if (event.once) {client.once(event.name, (...args) => event.execute(...args, client, guildInvites, vanityInvites))}
			else {client.on(event.name, (...args) => event.execute(...args, client, guildInvites, vanityInvites))}
		}
	});
}

const dashboardInit = require("./dashboard/dashInit.js");
client.on("ready", (...args) => dashboardInit.execute(...args, client, forDeploy));

// Bot token
let token = process.env.token;
let deploying = process.env.deployAskOnStart;
if (deploying == "true") {
	const deployCommands = require("./deploy-commands.js");
	deployCommands.execute(client, token, forDeploy);
} else {
	client.login(token);
}

// Error handler
client.on("error", (e) => console.line(e));
client.on("warn", (e) => console.warn(e));
process.on("unhandledRejection", error => console.error("----- Uncaught Rejection: -----\n", error));
process.on("uncaughtException", error => console.error("----- Uncaught Exception: -----\n", error));
if (debug_level >= 4) {
	client.on("debug", (e) => console.debug(e));
}

let redditFeedSub = [];
let redditFeedChannel = [];
setInterval(() => {
	client.guilds.cache.forEach(guild => {
		let tr = client.settings.get(guild.id, "redditFeed");
		if (!tr) {return}
		redditFeedSub[0] = client.settings.get(guild.id, "redditFeedSub1");
		redditFeedSub[1] = client.settings.get(guild.id, "redditFeedSub2");
		redditFeedSub[2] = client.settings.get(guild.id, "redditFeedSub3");
		redditFeedChannel[0] = client.settings.get(guild.id, "redditFeedChannel1");
		redditFeedChannel[1] = client.settings.get(guild.id, "redditFeedChannel2");
		redditFeedChannel[2] = client.settings.get(guild.id, "redditFeedChannel3");
		let i;
		for (i = 0; i < redditFeedSub.length; i++){
			if (redditFeedSub[i] == "") {return}
			if (redditFeedChannel[i] == "") {return}
			else { redditFetchFunction(redditFeedChannel[i], redditFeedSub[i], i, guild) }
		}
	});
}, 240000);
async function redditFetchFunction(channel, sub, i, guild) {
	let feedChannel = await client.channels.cache.get(channel);
	if (feedChannel == undefined) {return}
	let post = await fetch(`https://www.reddit.com/r/${sub}/new.json`)
		.then(res => res.json()).then(body => {
			let found = body.data.children;
			if (!found.length) {return channel.send(`Unable to find a post. The subreddit "${sub}" does not exist, or it has no available post data.`)}
			return found[0].data;
		});
	if (i == 0) {
		let lastID = client.settings.get(guild.id, "lastRedditFeedPost1");
		if (lastID == post.id) {return}
		else { client.settings.set(guild.id, post.id, "lastRedditFeedPost1") }
	} else if (i == 1) {
		let lastID = client.settings.get(guild.id, "lastRedditFeedPost2");
		if (lastID == post.id) {return}
		else { client.settings.set(guild.id, post.id, "lastRedditFeedPost2") }
	} else if (i == 2) {
		let lastID = client.settings.get(guild.id, "lastRedditFeedPost3");
		if (lastID == post.id) {return}
		else { client.settings.set(guild.id, post.id, "lastRedditFeedPost3") }
	} else {return}
	// Console.log(post)
	const embed = new EmbedBuilder()
		.setColor("#A020F0")
		.setTitle(post.title)
		.setURL(`https://reddit.com${post.permalink}`)
		.setAuthor({ name: post.author })
		.setTimestamp();
	const linkButton = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel("Link")
			.setStyle(ButtonStyle.Link)
			.setEmoji("🖥️")
			.setURL(`https://reddit.com${post.permalink}`)
	);
	if (post.url != null) {
		embed.setImage(post.url);
		feedChannel.send({ embeds: [embed], components: [linkButton] });
	}
	else {
		feedChannel.send({ embeds: [embed], components: [linkButton] });
	}
}