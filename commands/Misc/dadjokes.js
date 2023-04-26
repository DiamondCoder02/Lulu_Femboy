const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("dadjokes")
		.setDescription("Random dadjokes"),
	async execute(interaction) {
		// This 3 line good for api
		let response = await fetch("https://icanhazdadjoke.com/slack");
		let data = await response.text();
		const img = JSON.parse(data);
		const embed = new EmbedBuilder()
			.setFooter({ text: "Dad(dy) jokes < icanhazdadjoke.com >" })
			.setColor([ 0, 255, 0 ])
			.setDescription(img.attachments[0].text);
		await interaction.reply({ embeds: [embed] });
	}
};