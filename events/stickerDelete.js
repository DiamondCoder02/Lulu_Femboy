const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'stickerDelete',
	async execute(sticker, client) {
		//console.log(sticker)
		const gu = await client.guilds.fetch(sticker.guildId)
		console.log(`${gu.name} guild sticker deleted: "${sticker.name}.${sticker.format}" [Desc: ${sticker.description} / Tags: ${String(sticker.tags)}] (ID: ${sticker.id})`)
	}
};