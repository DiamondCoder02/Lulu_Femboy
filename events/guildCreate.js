const { EmbedBuilder } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildCreate',
	execute(guild) {
        console.log(`[${new Date().toLocaleString('hu-HU')}] Bot joined guild: ${guild.name}`)
	}
};