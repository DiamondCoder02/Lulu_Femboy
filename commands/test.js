const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow,MessageButton,MessageEmbed} = require('discord.js')
module.exports = {
	//guildOnly: true,
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Feature testing.'),
	async execute(interaction, client, config) {
		const nHentai = require('shentai')
        const sHentai = new nHentai
		const doujins = await sHentai.getNew()
		// Constants
		const backId = 'back'
		const forwardId = 'forward'
		const backButton = new MessageButton({
			style: 'SECONDARY',
			label: 'Back',
			emoji: '⬅️',
			customId: backId
		})
		const forwardButton = new MessageButton({
			style: 'SECONDARY',
			label: 'Forward',
			emoji: '➡️',
			customId: forwardId
		})
		// Put the following code wherever you want to send the embed pages:
		const {author,channel} = interaction
		const guild = [...client.guilds.cache.values()]
		/**
		 * Creates an embed with guilds starting from an index.
		 * @param {number} start The index to start from.
		 * @returns {Promise<MessageEmbed>}
		 */
		
		const generateEmbed = async start => {
			const current = doujins.slice(start, start + 10)
			// You can of course customise this embed however you want
			return new MessageEmbed({
				title: `Showing guilds ${start + 1}-${start + current.length} out of ${doujins.length}`,
				fields: await Promise.all(
					current.map(async doujins => ({
						name: doujins.id,
						value: `${doujins.titles.english}`
					}))
				)
			})
		}
		// Send the embed with the first 10 guilds
		const canFitOnOnePage = doujins.length <= 10
		const embedMessage = await channel.send({
			embeds: [await generateEmbed(0)],
			components: canFitOnOnePage ? [] : [new MessageActionRow({components: [forwardButton]})]
		})
		// Exit if there is only one page of guilds (no need for all of this)
		if (canFitOnOnePage) return
		// Collect button interactions (when a user clicks a button),
		// but only when the button as clicked by the original message author
		const collector = embedMessage.createMessageComponentCollector()
		let currentIndex = 0
		collector.on('collect', async interaction => {
			// Increase/decrease index
			interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
			// Respond to interaction by updating message with new embed
			await interaction.update({
				embeds: [await generateEmbed(currentIndex)],
				components: [new MessageActionRow({components: [...(currentIndex ? [backButton] : [])]})]
			})
		})
	}
}