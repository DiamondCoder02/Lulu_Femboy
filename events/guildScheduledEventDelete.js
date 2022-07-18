const { EmbedBuilder } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildScheduledEventDelete',
	execute(guildScheduledEvent, client) {
		//console.log(guildScheduledEvent)
        console.log(`[${new Date().toLocaleString('hu-HU')}] ${guildScheduledEvent.guild.name} event deleted: "${guildScheduledEvent.name}".`)
		const schedulesLogs = client.settings.get(guildScheduledEvent.guild.id, "schedulesLogs");
		if(schedulesLogs) { } else return
		try{
			if (client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(guildScheduledEvent.guild.id, "moderationChannel"))} else {channel = guildScheduledEvent.guild.systemChannel}
			return channel.send({ content: `[\`${new Date(guildScheduledEvent.createdTimestamp).toLocaleString('hu-HU')}\`] Guild event deleted 
Name: \`${guildScheduledEvent.name}\` 
Description: \`${guildScheduledEvent.description}\`.`});
		} catch(error) { 
			console.log(error) 
			//console.log("Error")
		}
	}
};