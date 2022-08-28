const { EmbedBuilder } = require('discord.js');
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
		try{
			console.log(`[${new Date().toLocaleString('hu-HU')}] ${newGuildScheduledEvent.guild.name} event updated: ${newGuildScheduledEvent.name}.`)
			const schedulesLogs = client.settings.get(oldGuildScheduledEvent.guild.id, "schedulesLogs");
			if(schedulesLogs) {
				if (client.channels.cache.get(client.settings.get(newGuildScheduledEvent.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(newGuildScheduledEvent.guild.id, "moderationChannel"))} else {channel = newGuildScheduledEvent.guild.systemChannel}
				if (oldGuildScheduledEvent.scheduledEndTimestamp === null) {oldend = "-"} else {oldend = new Date(oldGuildScheduledEvent.scheduledEndTimestamp).toLocaleString('hu-HU')}
				if (newGuildScheduledEvent.scheduledEndTimestamp === null) {newend = "-"} else {newend = new Date(newGuildScheduledEvent.scheduledEndTimestamp).toLocaleString('hu-HU')}
				if (oldGuildScheduledEvent.entityType === 1) scType = "StageInstance"
				if (oldGuildScheduledEvent.entityType === 2) scType = "Voice"
				if (oldGuildScheduledEvent.entityType === 3) scType = "External"
				if (oldGuildScheduledEvent.status === 1) staType = "Scheduled"
				if (oldGuildScheduledEvent.status === 2) staType = "Active"
				if (oldGuildScheduledEvent.status === 3) staType = "Completed"
				if (oldGuildScheduledEvent.status === 4) staType = "Cancelled"
				if (newGuildScheduledEvent.entityType === 1) newscType = "StageInstance"
				if (newGuildScheduledEvent.entityType === 2) newscType = "Voice"
				if (newGuildScheduledEvent.entityType === 3) newscType = "External"
				if (newGuildScheduledEvent.status === 1) newstaType = "Scheduled"
				if (newGuildScheduledEvent.status === 2) newstaType = "Active"
				if (newGuildScheduledEvent.status === 3) newstaType = "Completed"
				if (newGuildScheduledEvent.status === 4) newstaType = "Cancelled"
				const scheduleEmbed = new EmbedBuilder()
					.setColor('#FFFF00')
					.setTitle('Guild event updated has been detected')
					.setDescription(`Name: \`${oldGuildScheduledEvent.name}\``)
					.setTimestamp()
				if(oldGuildScheduledEvent.name !== newGuildScheduledEvent.name) { scheduleEmbed.addFields( { name: 'Name update detected:', value: `\`${oldGuildScheduledEvent.name}\` → \`${newGuildScheduledEvent.name}\`` } ) }
				if(oldGuildScheduledEvent.description !== newGuildScheduledEvent.description) { scheduleEmbed.addFields( { name: 'Description update detected:', value: `\`${oldGuildScheduledEvent.description}\` → \`${newGuildScheduledEvent.description}\`` } ) }
				if(oldGuildScheduledEvent.entityType !== newGuildScheduledEvent.entityType) { scheduleEmbed.addFields( { name: 'Entity type update detected:', value: `\`${scType}\` → \`${newscType}\`` } ) }
				if(oldGuildScheduledEvent.status !== newGuildScheduledEvent.status) { scheduleEmbed.addFields( { name: 'Status update detected:', value: `\`${staType}\` → \`${newstaType}\`` } ) }
				if(oldGuildScheduledEvent.scheduledStartTimestamp !== newGuildScheduledEvent.scheduledStartTimestamp) { scheduleEmbed.addFields( { name: 'Scheduled start update detected:', value: `\`${new Date(oldGuildScheduledEvent.scheduledStartTimestamp).toLocaleString('hu-HU')}\` → \`${new Date(newGuildScheduledEvent.scheduledStartTimestamp).toLocaleString('hu-HU')}\`` } ) }
				if(oldGuildScheduledEvent.scheduledEndTimestamp !== newGuildScheduledEvent.scheduledEndTimestamp) { scheduleEmbed.addFields( { name: 'Scheduled end update detected:', value: `\`${oldend}\` → \`${newend}\`` } ) }
				return channel.send({ embeds: [scheduleEmbed] })
			}
		} catch(error) { 
			console.log("Error in guildScheduledEventUpdate: ")
			console.log(error)
		}
	}
};