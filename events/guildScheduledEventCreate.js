const { EmbedBuilder } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildScheduledEventCreate',
	execute(guildScheduledEvent, client) {
		//console.log(guildScheduledEvent)
        console.log(`[${new Date().toLocaleString('hu-HU')}] ${guildScheduledEvent.guild.name} event created: "${guildScheduledEvent.name}" (By: ${guildScheduledEvent.creator.tag}).`)
		const schedulesLogs = client.settings.get(guildScheduledEvent.guild.id, "schedulesLogs");
		if(schedulesLogs) { } else return
		try{
			if (client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))} else {channel = guildScheduledEvent.guild.systemChannel}
			if (guildScheduledEvent.scheduledEndTimestamp === null) {end = "-"} else {end = new Date(guildScheduledEvent.scheduledEndTimestamp).toLocaleString('hu-HU')}
			if (guildScheduledEvent.entityType === 1) scType = "StageInstance"
			if (guildScheduledEvent.entityType === 2) scType = "Voice"
			if (guildScheduledEvent.entityType === 3) scType = "External"
			if (guildScheduledEvent.status === 1) staType = "Scheduled"
			if (guildScheduledEvent.status === 2) staType = "Active"
			if (guildScheduledEvent.status === 3) staType = "Completed"
			if (guildScheduledEvent.status === 4) staType = "Cancelled"
			return channel.send({ content: `[\`${new Date(guildScheduledEvent.createdTimestamp).toLocaleString('hu-HU')}\`] Guild event created by \`${guildScheduledEvent.creator.tag}\`! 
Name: \`${guildScheduledEvent.name}\` 
Description: \`${guildScheduledEvent.description}\` 
Place: \`${scType}\` 
Status: \`${staType}\` 
Start: \`${new Date(guildScheduledEvent.scheduledStartTimestamp).toLocaleString('hu-HU')}\` \End: \`${end}\`.`});
		} catch(error) { 
			console.log(error) 
		}
	}
};