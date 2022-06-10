const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildDelete',
	execute(guild) {
        console.log(`Bot left guild: ${guild.name}`)
	}
};