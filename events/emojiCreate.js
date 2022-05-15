const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'emojiCreate',
	execute(emoji) {
		console.log(emoji)
        console.log(`Guild emoji created: ${emoji.name}`)
	}
};