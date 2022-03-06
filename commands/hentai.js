const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('For horny people some horny pictures from rule34')
		.addStringOption(option => option.setName('fetish').setDescription('Give me something to search for.').setRequired(true)),
	async execute(interaction) {
        const args = interaction.options.getString('fetish')
        
	},
};