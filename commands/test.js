const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow,MessageButton,MessageEmbed} = require('discord.js')
module.exports = {
	//guildOnly: true,
	cooldown: 60,
	//permissions: "ADMINISTRATOR",
	// https://discord.js.org/#/docs/main/stable/class/Permissions
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Feature testing.'),
	async execute(interaction, client, config) {
		const e = interaction.user.toString()
		await interaction.reply({content: e})
	}
}