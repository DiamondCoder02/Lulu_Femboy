const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildScheduledEventCreate',
	execute(guildScheduledEvent) {
		console.log(guildScheduledEvent)
        console.log(`Guild event created: ${guildScheduledEvent.name}`)
	}
};