const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'emojiDelete',
	execute(emoji) {
		//console.log(emoji)
        console.log(`[${new Date().toLocaleString('hu-HU')}] ${emoji.guild.name} guild emoji deleted: "${emoji.name}" (${emoji.id})`)
	}
};