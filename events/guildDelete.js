const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildDelete',
	execute(guild) {
        console.log(`[${new Date().toLocaleString('hu-HU')}] Bot left guild: ${guild.name}`)
	}
};