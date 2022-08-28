const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder } = require('discord.js')
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), o = lang.translate.addOptions.split('-')
const translate = require('translate')
module.exports = {
    cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription(lang.translate.setDesc)
        .addStringOption(option => option.setName('text').setDescription(o[0]).setRequired(true))
		.addStringOption(option => option.setName('from').setDescription(o[1]))
        .addStringOption(option => option.setName('to').setDescription(o[2]))
        .addStringOption(option => option.setName('engine').setDescription(o[3])
            .addChoices(
                { name: "Google", value: 'google' },
                { name: "yandex", value: 'yandex' },
                { name: "libre", value: 'libre' },
                { name: "deepl", value: 'deepl' }
            )
        ),
    async execute(interaction) {
        if (interaction.options.getString('text').length > 1024) { return interaction.reply({content: lang.translate.long}) }
        if (interaction.options.getString('from') === null) { from = "english"} else from = interaction.options.getString('from')
        if (interaction.options.getString('to') === null) { to = "english"} else to = interaction.options.getString('to')
        if (interaction.options.getString('engine') === null) { eng = "google"} else eng = interaction.options.getString('engine')
        try {
            translate.engine = eng;
            translate.key = process.env.GOOGLE_KEY;
            const text = await translate(interaction.options.getString('text'), {cache: 10000, from: from, to: to });
            if (text.length > 1024) { return interaction.reply({content: lang.translate.longEmbed}) }
            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle(lang.translate.embed +": "+ eng +"\n"+ from + " -> " + to)
                .setDescription("--------------------\n"+text+"\n--------------------")
                .addFields( { name: lang.translate.embed2+":", value: "*"+interaction.options.getString('text')+"*" } )
            await interaction.reply({embeds: [embed]})
        } catch { return interaction.reply({content: lang.translate.error+"\nGoogle: https://cloud.google.com/translate/docs/languages"}) }
    }
}