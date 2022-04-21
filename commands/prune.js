const { SlashCommandBuilder } = require('@discordjs/builders');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), pr = lang.prune.split('-')
module.exports = {
	guildOnly: true,
	permissions: "MANAGE_MESSAGES",
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription(pr[3])
		.addIntegerOption(option => option.setName('amount').setDescription(pr[4]).setRequired(true)),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		if (amount <= 1 || amount > 100) { return interaction.reply({ content: pr[0], ephemeral: true }) }
		await interaction.channel.bulkDelete(amount, true)
		return interaction.reply({ content: pr[1] + `\`${amount}\`` + pr[2]})
	},
};