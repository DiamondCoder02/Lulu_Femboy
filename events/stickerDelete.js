const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'stickerDelete',
	async execute(sticker, client) {
		//console.log(sticker)
		const gu = await client.guilds.fetch(sticker.guildId)
		console.log(`[${new Date().toLocaleString('hu-HU')}] ${gu.name} guild sticker deleted: "${sticker.name}.${sticker.format}" [Desc: ${sticker.description} / Tags: ${String(sticker.tags)}] (ID: ${sticker.id})`)
	}
};