const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const botStat = require("../../botConfigs/bot_private.json", "utf8"); const SetAct = botStat.botStatus;
require("dotenv").config();
let stopPassword = process.env.stopPassword;
let debug_level = process.env.debug_level;
let botStatusChannelId = process.env.botStatusChannelId;
module.exports = {
	name: "ready",
	once: true,
	execute(arg, client, guildInvites, vanityInvites) {
		client.user.setActivity("Nya~");
		setInterval(() => {
			let status = SetAct[Math.floor(Math.random() * SetAct.length)];
			client.user.setActivity(status);
		}, 10800000);

		client.guilds.cache.forEach(guild => {
			// Check if bot has permissions to view invites
			const botPermissionCheck = guild.members.cache.get(client.user.id);
			if (botPermissionCheck.permissions.has(PermissionsBitField.Flags.ManageGuild)){
				guild.invites.fetch().then(invites => {
					const codeUses = new Map();
					invites.each(inv => codeUses.set(inv.code, inv.uses));
					guildInvites.set(guild.id, codeUses);
				}).catch(err => { console.log("Ready invite Error:", err) });
				if (guild.vanityURLCode != null) {
					guild.fetchVanityData().then(invites => {
						vanityInvites.set(guild.id, invites);
					}).catch(err => { console.log("Ready vanity Error:", err) });
				}
			}
		});

		// eslint-disable-next-line no-console
		console.log("\n-- Logged in as: " + client.user.tag
            + "\n\t-- Client_ID: " + client.user.id
            + "\n\t-- Password: " + stopPassword
            + "\n\t-- Debug_level: " + debug_level
            + "\n\t-- Ready at: " + client.readyAt);

		const embed = new EmbedBuilder()
			.setColor("#FFFF00")
			.setTitle("Bot has started! \n" + client.user.tag)
			.setDescription(`Bot info:
DebugLevel: ${debug_level},
Ready: <t:${Math.floor(client.readyTimestamp / 1000)}:f> 
That was: <t:${Math.floor(client.readyTimestamp / 1000)}:R>`);
		try {
			const channel = client.channels.cache.get(botStatusChannelId);
			channel.send({ embeds: [embed] });
		} catch {
			console.log("No status channel ID given or found. Continuing...");
		}
	}
};