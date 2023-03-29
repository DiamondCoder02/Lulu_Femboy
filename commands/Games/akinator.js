const { SlashCommandBuilder } = require("@discordjs/builders"), akinator = require("discord.js-akinator");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("akinator")
		.setDescription("Play the Akinator game.")
		.addStringOption(option => option.setName("lang").setDescription("Enter a language (Default: en)"))
		.addBooleanOption(option => option.setName("child_mode").setDescription("If you want child mode (Default: true)"))
		.addStringOption(option => option.setName("game_type").setDescription("Enter a game type (Default: character)")
			.addChoices(
				{ name: "Animals", value: "animal" },
				{ name: "Characters", value: "character" },
				{ name: "Objects", value: "object" }
			))
		.addBooleanOption(option => option.setName("button").setDescription("If you want a button (Default: true)")),
	async execute(interaction) {
		if (interaction.options.getBoolean("button") === false) {useButtons = false} else {useButtons = true}
		if (interaction.options.getBoolean("child_mode") === false) {childMode = false} else {childMode = true}
		if (interaction.options.getString("lang")) {lang = interaction.options.getString("lang")} else {lang = "en"}
		if (interaction.options.getString("game_type")) {gameType = interaction.options.getString("game_type")} else {gameType = "character"}

		try { const la = require(`../node_modules/discord.js-akinator/src/translations/${lang}.json`) }
		catch { return await interaction.reply("An error occured. Make sure you choose a correct language: \nhttps://github.com/WillTDA/Discord.js-Akinator/tree/master/src/translations .")}

		// const lang = "en"; //The Language of the Game
		// const childMode = false; //Whether to use Akinator's Child Mode
		// const gameType = "character"; //The Type of Akinator Game to Play. ("animal", "character" or "object")
		// const useButtons = true; //Whether to use Discord's Buttons
		// const embedColor = "#1F1E33"; //The Color of the Message Embeds

		try {
			akinator(interaction, {
				embedColor: "#00FF00",
				language: lang,
				childMode: childMode,
				gameType: gameType,
				useButtons: useButtons
			});
		} catch (error) { console.log("Akinator had a stroke: "+error) }
	}
};