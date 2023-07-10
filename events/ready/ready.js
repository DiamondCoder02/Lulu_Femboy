const { PermissionsBitField, ActivityType } = require("discord.js");
// Asd: const botStat = require("../../botConfigs/bot_private.json", "utf8"); const SetAct = botStat.botStatus;
require("dotenv").config();
let stopPassword = process.env.stopPassword;
let debug_level = process.env.debug_level;
module.exports = {
	name: "ready",
	once: true,
	execute(arg, client, guildInvites, vanityInvites) {
		client.user.setActivity(client.guilds.cache.size+" servers currently", { type: ActivityType.Watching });
		setInterval(() => {
			client.user.setActivity(client.guilds.cache.size+" servers currently", { type: ActivityType.Watching });
		}, 10800000);

		client.guilds.cache.forEach(guild => {
			const botPermissionCheck = guild.members.cache.get(client.user.id);
			if (botPermissionCheck.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
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
			+ "\n\t-- Ready at: " + client.readyAt
		);
	}
};