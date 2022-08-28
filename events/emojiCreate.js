const { EmbedBuilder } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'emojiCreate',
	execute(emoji) {
		//console.log(emoji)
        console.log(`[${new Date().toLocaleString('hu-HU')}] ${emoji.guild.name} guild emoji created: "${emoji.name}" (${emoji.id}) [${emoji.animated?'animated':'not animated'}]`)
	}
};