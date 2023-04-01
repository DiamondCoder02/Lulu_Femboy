const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "guildScheduledEventDelete",
	execute(guildScheduledEvent, client) {
		// Console.log(guildScheduledEvent)
		let channel;
		console.log(`${guildScheduledEvent.guild.name} event deleted: "${guildScheduledEvent.name}".`);
		const schedulesLogs = client.settings.get(guildScheduledEvent.guild.id, "schedulesLogs");
		if (schedulesLogs) {
			if (client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))} else {channel = guildScheduledEvent.guild.systemChannel}
			const scheduleCreate = new EmbedBuilder()
				.setColor("#FFFF00")
				.setTitle(`Guild event deleted: \`${guildScheduledEvent.name}\``)
				.setDescription(`Description: \n\`${guildScheduledEvent.description}\`. \n\nWas creqated at: [\`${new Date(guildScheduledEvent.createdTimestamp).toLocaleString("hu-HU")}\`]`)
				.setTimestamp();
			return channel.send({ embeds: [scheduleCreate] });
		}
	}
};