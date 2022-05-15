const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'stickerCreate',
	execute(sticker) {
		console.log(sticker)
        console.log(`Guild sticker created: ${sticker.name}`)
	}
};