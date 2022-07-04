const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'stickerCreate',
	async execute(sticker, client) {
		//console.log(sticker)
        const gu = await client.guilds.fetch(sticker.guildId)
		console.log(`[${new Date().toLocaleString('hu-HU')}] ${gu.name} guild sticker created: "${sticker.name}.${sticker.format}" [Desc: ${sticker.description} / Tags: ${String(sticker.tags)}] (ID: ${sticker.id})`)
	}
};