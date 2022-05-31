const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildScheduledEventCreate',
	execute(guildScheduledEvent, client) {
		//console.log(guildScheduledEvent)
        console.log(`[${new Date(guildScheduledEvent.createdTimestamp).toLocaleString('hu-HU')}] ${guildScheduledEvent.guild.name} event created: "${guildScheduledEvent.name}" (By: ${guildScheduledEvent.creator.tag}).`)
		try{
			if (client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))} else {channel = guildScheduledEvent.guild.systemChannel}
			if (guildScheduledEvent.scheduledEndTimestamp === null) {end = "-"} else {end = new Date(guildScheduledEvent.scheduledEndTimestamp).toLocaleString('hu-HU')}
			return channel.send({ content: `[\`${new Date(guildScheduledEvent.createdTimestamp).toLocaleString('hu-HU')}\`] Guild event created by \`${guildScheduledEvent.creator.tag}\`! 
			Name: \`${guildScheduledEvent.name}\` 
			Description: \`${guildScheduledEvent.description}\` 
			Place: \`${guildScheduledEvent.entityType}\` 
			Status: \`${guildScheduledEvent.status}\` 
			Start: \`${new Date(guildScheduledEvent.scheduledStartTimestamp).toLocaleString('hu-HU')}\` \End: \`${end}\`.`});
		} catch(error) { 
			console.log(error) 
			//console.log("Error")
		}
	}
};