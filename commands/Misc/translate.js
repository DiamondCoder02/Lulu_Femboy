const { SlashCommandBuilder } = require("@discordjs/builders"), { EmbedBuilder } = require("discord.js");
const translate = require("translate");
module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName("translate")
		.setDescription("Translate messages")
		.addStringOption(option => option.setName("text").setDescription("The text that needs translation").setRequired(true))
		.addStringOption(option => option.setName("from").setDescription("Translate from (Default English)"))
		.addStringOption(option => option.setName("to").setDescription("Translate to (Default English)"))
		.addStringOption(option => option.setName("engine").setDescription("What translation engine to use (Default Google)")
			.addChoices(
				{ name: "Google", value: "google" },
				{ name: "yandex", value: "yandex" },
				{ name: "libre", value: "libre" },
				{ name: "deepl", value: "deepl" }
			)
		),
	async execute(interaction) {
		if (interaction.options.getString("text").length > 1024) { return interaction.reply({content: "Sorry the text is too long. Please try again with a shorter text."}) }
		if (interaction.options.getString("from") === null) { from = "english"} else {from = interaction.options.getString("from")}
		if (interaction.options.getString("to") === null) { to = "english"} else {to = interaction.options.getString("to")}
		if (interaction.options.getString("engine") === null) { eng = "google"} else {eng = interaction.options.getString("engine")}
		try {
			translate.engine = eng;
			translate.key = process.env.GOOGLE_KEY;
			const text = await translate(interaction.options.getString("text"), {cache: 10000, from: from, to: to });
			if (text.length > 1024) { return interaction.reply({content: "Sorry the translated text is too long to display."}) }
			const embed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle("Translation from: "+ eng +"\n"+ from + " -> " + to)
				.setDescription("--------------------\n"+text+"\n--------------------")
				.addFields({ name: "Translated from:", value: "*"+interaction.options.getString("text")+"*" });
			await interaction.reply({embeds: [embed]});
		} catch { return interaction.reply({content: "Error: please make sure you wrote the languages correctly.\nGoogle: https://cloud.google.com/translate/docs/languages"}) }
	}
};