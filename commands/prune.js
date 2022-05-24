const { SlashCommandBuilder } = require('@discordjs/builders');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), pr = lang.prune.split('-')
module.exports = {
	guildOnly: true,
	permissions: "MANAGE_MESSAGES",
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription(pr[3])
		.addIntegerOption(option => option.setName('amount').setDescription(pr[4]).setMinValue(1).setMaxValue(99).setRequired(true))
		//.addUserOption(option => option.setName('user').setDescription("Delete messages from a specific user"))
		,
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		const user = interaction.options.getUser('user');
		/*
		if (user) {
			const target = (await interaction.channel.messages.fetch({ limit:amount })).filter(m => m.author.id === user.id)
			await interaction.channel.bulkDelete(target, true)
			return interaction.reply({ content: pr[1] + `\`${amount}\` (${user})` + pr[2]})
		} else {
		*/
			await interaction.channel.bulkDelete(amount, true)
			return interaction.reply({ content: pr[1] + `\`${amount}\`` + pr[2]})
		//}
	},
};