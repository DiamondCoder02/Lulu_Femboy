const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'guildDelete',
	execute(client) {
        console.log(`Guild: ${client.guild.name}`)
	}
};