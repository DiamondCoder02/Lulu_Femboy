const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'guildDelete',
	execute(guild) {
        console.log(`[${new Date().toLocaleString('hu-HU')}] Bot left guild: ${guild.name}`)
	}
};