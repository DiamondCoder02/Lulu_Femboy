const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "guildBanRemove",
	execute(ban, client) {
		// Console.log(ban)
		const banKickLogs = client.settings.get(ban.guild.id, "banKickLogs");
		console.log(`[${new Date().toLocaleString("hu-HU")}] ${ban.user.tag} unbanned from ${ban.guild.name}`);
		if (banKickLogs) {
			try {
				if (channel == ban.guild.systemChannel) {channel = ban.guild.systemChannel}
				else {channel = client.channels.cache.get(client.settings.get(ban.guild.id, "moderationChannel"))}
				return channel.send({ content: `[\`${new Date().toLocaleString("hu-HU")}\`] ${ban.user.tag} has been unbanned today \`(${ban.user.id})\`.`});
			} catch (error) {
				console.log(error);
				console.log("GuildBanRemove Error");
			}
		}
	}
};