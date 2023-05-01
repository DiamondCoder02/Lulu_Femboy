const { SlashCommandBuilder } = require("@discordjs/builders"), { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType } = require("discord.js"), fs = require("fs");
let eventFolders = fs.readdirSync("./events"); let eventFilesArray = [];
for (const folder of eventFolders) {
	fs.readdir(`./events/${folder}`, (err, files) => {
		if (err) {throw err}
		eventFilesArray.push(`\n__**${folder}**__`);
		for (const file of files) {
			if (!file.endsWith(".js")) {continue}
			if (file === "ready.js") {eventFilesArray.push("- "+file.slice(folder, -3)); continue}
			eventFilesArray.push("- "+file.slice(folder.length, -3));
		}
	});
}
let commandFolders = fs.readdirSync("./commands"); let commandFilesArray = [];
for (const folder of commandFolders) {
	fs.readdir(`./commands/${folder}`, (err, files) => {
		if (err) {throw err}
		commandFilesArray.push(`\n__**${folder}**__`);
		for (const file of files) {
			if (!file.endsWith(".js")) {continue}
			commandFilesArray.push("- "+file.slice(0, -3));
		}
	});
}

const package = require("../../package.json");
const os = require("os");
module.exports = {
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setName("bot_info")
		.setDescription("Bot information.")
		.addBooleanOption(option => option.setName("owner").setDescription("Warning: This can show potenially sensitive information.")),
	async execute(interaction, client) {
		let goodBadJSON = fs.readFileSync("./botConfigs/bot_private.json");
		const goodBad = JSON.parse(goodBadJSON);
		const packDependence = Object.entries(package.dependencies);
		const npmPackages = packDependence.join(", \n");
		const GaInBi = `~~MessageContent,~~
Guilds, 
GuildMembers, 
GuildBans, 
GuildEmojisAndStickers, 
GuildIntegrations, 
~~GuildWebhooks,~~
GuildInvites, 
GuildVoiceStates,
~~GuildPresences,~~
GuildMessages,
GuildScheduledEvents,
GuildMessageReactions,
~~GuildMessageTyping,~~
GuildVoiceStates,
DirectMessages,
DirectMessageReactions,
~~DirectMessageTyping~~`;
		const pars = `Channel,
GuildMember,
GuildScheduledEvent,
Message,
Reaction,
User,
~~ThreadMember~~
`;
		const guildLength = client.guilds.cache.map(guild => guild.id).length;
		const page = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("delete").setLabel("Delete message").setStyle(ButtonStyle.Danger).setEmoji("✖️"));
		const filter = i => i.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 30000 });
		collector.on("collect", async () => { await interaction.deleteReply(); collector.stop()});
		const version_embed = new EmbedBuilder()
			.setColor([ 255, 255, 0 ])
			.setTitle("Here is some information about the bot and its development:")
			.setDescription("Source code / Creator: [Github](https://github.com/DiamondPRO02/Femboi_OwO)")
			.setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
			.addFields(
				{ name: "Roadmap of development", value: "[Github project](https://github.com/users/DiamondPRO02/projects/2/views/1)", inline: true },
				{ name: "To fix/bugs:", value: "[Github issues](https://github.com/DiamondPRO02/Femboi_OwO/issues)", inline: true },
				{ name: "How to use:", value: "[slash commands](https://imgur.com/a/dStRp6Y)" },
				{ name: "Event listeners:", value: String(eventFilesArray.join("\n")), inline: true },
				{ name: "Commands:", value: String(commandFilesArray.join("\n")), inline: true },
				{ name: "Bot Stop Password:", value: "||RickRoll :3||" },
				{ name: "Project name:", value: package.name, inline: true },
				{ name: "Project version:", value: package.version, inline: true },
				{ name: "Project author:", value: package.author, inline: true },
				{ name: "Project license:", value: package.license, inline: true },
				{ name: "Project main file:", value: package.main, inline: true },
				{ name: "Project description:", value: package.description },
				{ name: "Project homepage:", value: package.homepage },
				{ name: "__npm packages__", value: npmPackages, inline: true },
				{ name: "__GatewayIntentBits__", value: GaInBi, inline: true },
				{ name: "__Partials__", value: pars, inline: true },
				{ name: "Currently joined servers:", value: "`"+String(guildLength)+"` guilds" },
				{ name: "I was called good bot:", value: "`"+String(goodBad.goodBot)+ "` time(s)", inline: true },
				{ name: "I was called bad bot:", value: "`"+String(goodBad.badBot)+ "` time(s)", inline: true },
				{ name: "People asked if:", value: "They can f**k my bot `"+String(goodBad.canIFuckBot)+ "` time(s)", inline: true }
			)
			.setTimestamp()
			.setFooter({ text: "Last update: 2023.Feb.17." });
		let uptime = os.uptime();
		let days = Math.floor(uptime / (60 * 60 * 24));
		let hours = Math.floor(uptime / (60 * 60)) - (days * 24);
		let minutes = Math.floor(uptime / 60) - (days * 24 * 60) - (hours * 60);
		let seconds = Math.floor(uptime % 60);
		let uptimeString = `${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`;
		let totalSeconds = (client.uptime / 1000);
		let clientdays = Math.floor(totalSeconds / 86400);
		let clienthours = Math.floor((totalSeconds %= 86400) / 3600);
		let clientminutes = Math.floor((totalSeconds%= 3600) / 60);
		let clientseconds = Math.floor(totalSeconds % 60);
		let clientuptime = `${clientdays} day(s), ${clienthours} hour(s), ${clientminutes} minute(s), ${clientseconds} second(s)`;
		let totalMemory = os.totalmem() / 1024 / 1024;
		let usedMemory = totalMemory - (os.freemem() / 1024 / 1024);
		let usedMemoryPercentage = Math.round((usedMemory / totalMemory) * 100);
		let freeMemory = os.freemem() / 1024 / 1024;
		let cpu1 = os.cpus()[0];
		let cpuCores = os.cpus().length;
		const osEmbed = new EmbedBuilder()
			.setColor("#FFFF00")
			.setTitle("System info:")
			.setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
			.addFields(
				{ name: "----------System", value: `OS: \`${os.type()}\`\nOS version: \`${os.release()}\`\nOS platform: \`${os.platform}\`\nOS arc: \`${os.arch()}\`\nPC name: \`${os.hostname}\``, inline: true },
				{ name: "Info:----------", value: `Memory %: \`${usedMemoryPercentage} %\`\nMemory total: \`${totalMemory.toFixed(2)} MB\`\nMemory used: \`${usedMemory.toFixed(2)} MB\`\nMemory free: \`${freeMemory.toFixed(2)} MB\``, inline: true },
				{ name: "System Uptime:", value: `\`${uptimeString}\`` },
				{ name: "Bot Uptime:", value: `\`${clientuptime}\`` },
				{ name: "CPU", value: `Model: \`${cpu1.model}\`\nSpeed: \`${cpu1.speed} MHz\`\nCores: \`${cpuCores}\``, inline: true }
			)
			.setTimestamp();
		await interaction.reply({ embeds: [ version_embed, osEmbed ], components: [page] });
	}
};
