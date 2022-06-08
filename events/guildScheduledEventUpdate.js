const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildScheduledEventUpdate',
	execute(oldGuildScheduledEvent, newGuildScheduledEvent, client ) {
		/*
		console.log(oldGuildScheduledEvent)
        console.log(`Guild event old updated: ${oldGuildScheduledEvent.name}`)
		console.log(newGuildScheduledEvent)
        console.log(`Guild event new updated: ${newGuildScheduledEvent.name}`)
		*/
		console.log(`[${new Date(newGuildScheduledEvent.createdTimestamp).toLocaleString('hu-HU')}] ${newGuildScheduledEvent.guild.name} event updated: ${newGuildScheduledEvent.name}.`)
		const schedulesLogs = client.settings.get(oldGuildScheduledEvent.guild.id, "schedulesLogs");
		if(schedulesLogs) { } else return
		try{
			if (client.channels.cache.get(client.settings.get(newGuildScheduledEvent.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(newGuildScheduledEvent.guild.id, "moderationChannel"))} else {channel = newGuildScheduledEvent.guild.systemChannel}
			if (oldGuildScheduledEvent.scheduledEndTimestamp === null) {oldend = "-"} else {oldend = new Date(oldGuildScheduledEvent.scheduledEndTimestamp).toLocaleString('hu-HU')}
			if (newGuildScheduledEvent.scheduledEndTimestamp === null) {newend = "-"} else {newend = new Date(newGuildScheduledEvent.scheduledEndTimestamp).toLocaleString('hu-HU')}
			return channel.send({ content: `[\`${new Date(newGuildScheduledEvent.createdTimestamp).toLocaleString('hu-HU')}\`] Guild event updated to: 
Name: \`${oldGuildScheduledEvent.name}\` => \`${newGuildScheduledEvent.name}\` 
Description: \`${oldGuildScheduledEvent.description}\` 
	=>	  \`${newGuildScheduledEvent.description}\` 
Place: \`${oldGuildScheduledEvent.entityType}\` => \`${newGuildScheduledEvent.entityType}\` 
Status: \`${oldGuildScheduledEvent.status}\` = > \`${newGuildScheduledEvent.status}\`
Start: \`${new Date(oldGuildScheduledEvent.scheduledStartTimestamp).toLocaleString('hu-HU')}\` => \`${new Date(newGuildScheduledEvent.scheduledStartTimestamp).toLocaleString('hu-HU')}\`
End: \`${oldend}\` => \`${newend}\`.`});
		} catch(error) { 
			console.log(error) 
			//console.log("Error")
		}
	}
};