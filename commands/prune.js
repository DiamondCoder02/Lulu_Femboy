const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	guildOnly: true,
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Purge/clean/prune up to 99 messages.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to delete/clean/prune').setRequired(true)),
	async execute(interaction, client, config, lang) {
		let pr = lang.pr2.split('-')
		const amount = interaction.options.getInteger('amount');
		if (amount <= 1 || amount > 100) {
			return interaction.reply({ content: pr[0], ephemeral: true });
		}
		await interaction.channel.bulkDelete(amount, true)
		return interaction.reply({ content: pr[1] + `\`${amount}\`` + pr[2]});
	},
};