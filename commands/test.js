const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');

module.exports = {
	//guildOnly: true,
	cooldown: 3,
	//permissions: "ADMINISTRATOR",
	// https://discord.js.org/#/docs/main/stable/class/Permissions
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Feature testing.'),
	async execute(interaction, client, config) {
		console.log("test")
	}
}