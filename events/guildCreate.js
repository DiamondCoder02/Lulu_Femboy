const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'guildCreate',
	execute(guild) {
        console.log(`[${new Date().toLocaleString('hu-HU')}] Bot joined guild: ${guild.name}`)
	}
};