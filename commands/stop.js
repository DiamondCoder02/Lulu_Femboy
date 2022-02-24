const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot with a password.'),
	async execute(interaction, client) {
		await interaction.reply(`Bot has been stopped by ${interaction.user.tag}`);
		console.log(`-------------------------\nThe bot is being stopped!!!\nTriggered: ${interaction.user.tag} in #${interaction.channel.name} at ${interaction.createdTimestamp}\n-------------------------`)
		client.destroy()
	}
}