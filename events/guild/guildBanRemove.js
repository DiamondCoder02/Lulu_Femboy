module.exports = {
	name: "guildBanRemove",
	execute(ban, client) {
		let channel;
		// Console.log(ban)
		const banKickLogs = client.settings.get(ban.guild.id, "banKickLogs");
		if (banKickLogs) {
			try {
				if (channel == ban.guild.systemChannel) {channel = ban.guild.systemChannel}
				else {channel = client.channels.cache.get(client.settings.get(ban.guild.id, "moderationChannel"))}
				return channel.send({ content: `[\`${new Date().toLocaleString("hu-HU")}\`] ${ban.user.username} has been unbanned today \`(${ban.user.id})\`.` });
			} catch (error) {
				console.log(error);
			}
		}
	}
};