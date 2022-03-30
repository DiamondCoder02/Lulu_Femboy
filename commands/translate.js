const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate messages to a language')
        .addStringOption(option => option.setName('to').setDescription('Translate to').setRequired(true))
        .addStringOption(option => option.setName('text').setDescription('The text that needs translation').setRequired(true))
		.addStringOption(option => option.setName('from').setDescription('Translate from')),
    async execute(interaction, client, config, lang) {
        const text = await translate(interaction.options.getString('text'), { from: interaction.options.getString('from'), to: interaction.options.getString('to') })
        const embed = new MessageEmbed()
            .setColor('#00ffff')
            .setTitle(String(text))
            .setDescription("translated from: \n"+interaction.options.getString('text'))
        await interaction.reply({content: text})
        //interaction.reply({embed: embed})
    }
}