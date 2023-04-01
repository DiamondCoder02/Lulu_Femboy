module.exports = {
	name: "guildBanAdd",
	execute(ban, client) {
		let channel;
		// Console.log(ban)
		const banKickLogs = client.settings.get(ban.guild.id, "banKickLogs");
		if (banKickLogs) {
			try {
				if (ban.guild.systemChannel) { channel = ban.guild.systemChannel}
				else {channel = client.channels.cache.get(client.settings.get(ban.guild.id, "moderationChannel"))}
				return channel.send({ content: `[\`${new Date().toLocaleString("hu-HU")}\`] ${ban.user.tag} has been banned \`(${ban.user.id})\`.` });
			} catch (error) {
				console.log(error);
			}
		}
	}
};