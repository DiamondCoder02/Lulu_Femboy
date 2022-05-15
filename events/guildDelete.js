const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildDelete',
	execute(client) {
        console.log(`Bot left guild: ${client.guild.name}`)
	}
};