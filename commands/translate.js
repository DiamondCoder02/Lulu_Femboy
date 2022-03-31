const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
const translate = require('translate')
module.exports = {
    cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate messages to a language. Please choose languages in English')
        .addStringOption(option => option.setName('text').setDescription('The text that needs translation').setRequired(true))
		.addStringOption(option => option.setName('from').setDescription('Translate from (Default English)'))
        .addStringOption(option => option.setName('to').setDescription('Translate to (Default English)')),
    async execute(interaction, client, config, lang) {
        if (interaction.options.getString('from') === null) { from = "english"} else from = interaction.options.getString('from')
        if (interaction.options.getString('to') === null) { to = "english"} else to = interaction.options.getString('to')
        try {
            translate.engine = "google"; // Or "yandex", "libre", "deepl"
            translate.key = process.env.GOOGLE_KEY;
            const text = await translate(interaction.options.getString('text'), {cache: 10000, from: from, to: to });
            const embed = new MessageEmbed()
                .setColor('#00ffff')
                .setTitle("Translation from google: \n"+ from + " -> " + to)
                .setDescription("--------------------\n"+text+"\n--------------------")
                .addField("translated from:", "*"+interaction.options.getString('text')+"*")
            await interaction.reply({embeds: [embed]})
        } catch { interaction.reply({content: "Error: please make sure you wrote the languages correctly."}) }
    }
}