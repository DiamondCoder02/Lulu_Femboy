const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'stickerDelete',
	execute(sticker) {
		console.log(sticker)
        console.log(`Guild sticker deleted: ${sticker.name}`)
	}
};