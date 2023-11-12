const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const wait = require("node:timers/promises").setTimeout;
module.exports = {
	data: new SlashCommandBuilder()
		.setName("catboys")
		.setDescription("Pictures from catboy api")
		.addStringOption(option => option.setName("category").setDescription("Get yourself a cute catboy")
			.addChoices(
				{ name: "catboys", value: "img" },
				{ name: "Baka", value: "baka" },
				{ name: "catemoji", value: "catboy" }
			)
		)
		.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10)),
	async execute(interaction) {
		interaction.reply("Temporary dissabled"); return;
		let amount = 1, category = "img";
		if (interaction.options.getNumber("repeat")) { amount = Number(interaction.options.getNumber("repeat")) }
		if (interaction.options.getString("category")) { category = interaction.options.getString("category") }
		for (let a = 0; a < amount; a++) {
			// This 3 line good for api
			let response = await fetch(`https://api.catboys.com/${category}`);
			let data = await response.text();
			const img = JSON.parse(data);
			const embed = new EmbedBuilder()
				.setFooter({ text: `${category} - ${a + 1}/${amount}` })
				.setColor([0, 255, 0]);
			if (category === "catboy") { embed.setDescription(`Catboy says: ${img.response}`) }
			else if (img.error !== "none") { return interaction.channel.send("Error happened: " + img.error) }
			else { embed.setImage(img.url) }

			try { await interaction.reply({ embeds: [embed] }) }
			catch { interaction.followUp({ embeds: [embed] }) }
			/*
			try { await interaction.channel.send({ embeds: [embed] }) }
			catch { interaction.channel.send({ embeds: [embed] }) }
			*/
			await wait(1000);
		}
	}
};