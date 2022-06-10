const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildCreate',
	execute(guild) {
        console.log(`Bot joined guild: ${guild.name}`)
	}
};