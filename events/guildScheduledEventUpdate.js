const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildScheduledEventUpdate',
	execute(oldGuildScheduledEvent, newGuildScheduledEvent ) {
		console.log(oldGuildScheduledEvent)
        console.log(`Guild event old updated: ${oldGuildScheduledEvent.name}`)
		console.log(newGuildScheduledEvent)
        console.log(`Guild event new updated: ${newGuildScheduledEvent.name}`)
	}
};