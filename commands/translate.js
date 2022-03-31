const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
//const translate = require('@iamtraction/google-translate');
const translate = require('translate')
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate messages to a language. Please choose languages in English')
        .addStringOption(option => option.setName('text').setDescription('The text that needs translation').setRequired(true))
		.addStringOption(option => option.setName('from').setDescription('Translate from (Default English)'))
        .addStringOption(option => option.setName('to').setDescription('Translate to (Default English)')),
    async execute(interaction, client, config, lang) {
        //try {
            translate.engine = "google"; // Or "yandex", "libre", "deepl"
            translate.key = process.env.GOOGLE_KEY;
            const text = await translate(interaction.options.getString('text'), { from: interaction.options.getString('from'), to: interaction.options.getString('to') });

            const embed = new MessageEmbed()
                .setColor('#00ffff')
                .setTitle("Translation: "+ interaction.options.getString('from') + " -> " + interaction.options.getString('to'))
                .setDescription(text)
                .setTimestamp()
                .addField("translated from:", interaction.options.getString('text'))
            //await interaction.reply({content: text + "\ntranslated from: \n"+interaction.options.getString('text')})
            console.log(embed)
            await interaction.reply({embeds: [embed]})
        //} catch { interaction.reply({content: "Error: please make sure you wrote the languages correctly."}) }
    }
}