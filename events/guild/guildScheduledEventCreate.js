const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "guildScheduledEventCreate",
	execute(guildScheduledEvent, client) {
		// Console.log(guildScheduledEvent)
		let channel, end, scType, staType;
		console.log(`${guildScheduledEvent.guild.name} event created: "${guildScheduledEvent.name}" (By: ${guildScheduledEvent.creator.tag}).`);
		const schedulesLogs = client.settings.get(guildScheduledEvent.guild.id, "schedulesLogs");
		if (schedulesLogs) {
			if (client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))} else {channel = guildScheduledEvent.guild.systemChannel}
			if (guildScheduledEvent.scheduledEndTimestamp === null) {end = "-"} else {end = new Date(guildScheduledEvent.scheduledEndTimestamp).toLocaleString("hu-HU")}
			if (guildScheduledEvent.entityType === 1) {scType = "StageInstance"}
			if (guildScheduledEvent.entityType === 2) {scType = "Voice"}
			if (guildScheduledEvent.entityType === 3) {scType = "External"}
			if (guildScheduledEvent.status === 1) {staType = "Scheduled"}
			if (guildScheduledEvent.status === 2) {staType = "Active"}
			if (guildScheduledEvent.status === 3) {staType = "Completed"}
			if (guildScheduledEvent.status === 4) {staType = "Cancelled"}
			const scheduleCreate = new EmbedBuilder()
				.setColor([ 255, 255, 0 ])
				.setTitle(`Guild event created: \`${guildScheduledEvent.name}\``)
				.setDescription(`Guild event created by \`${guildScheduledEvent.creator.tag}\``)
				.setTimestamp()
				.addFields(
					{ name: "Description:", value: `\`${guildScheduledEvent.description}\`` },
					{ name: "Created at:", value: `[\`${new Date(guildScheduledEvent.createdTimestamp).toLocaleString("hu-HU")}\`]` },
					{ name: "Place:", value: `\`${scType}\``, inline: true },
					{ name: "Status:", value: `\`${staType}\``, inline: true },
					{ name: "Start:", value: `[\`${new Date(guildScheduledEvent.scheduledStartTimestamp).toLocaleString("hu-HU")}\`] \n**End:**\n \`${end}\`` }
				);
			return channel.send({ embeds: [scheduleCreate] });
		}
	}
};