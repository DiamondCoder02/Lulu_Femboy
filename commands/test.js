const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Feature testing.'),
    async execute(interaction, client, config) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			)
            .addComponents(
				new MessageButton()
					.setCustomId('secondary')
					.setLabel('Secondary')
					.setStyle('SECONDARY'),
            )
            .addComponents(
				new MessageButton()
					.setCustomId('success')
					.setLabel('Success')
					.setStyle('SUCCESS'),
            )
            .addComponents(
				new MessageButton()
					.setCustomId('danger')
					.setLabel('Danger')
					.setStyle('DANGER'),
            )
            .addComponents(
				new MessageButton()
					.setURL('https://discordjs.guide/interactions/buttons.html')
					.setLabel('link')
					.setStyle('LINK'),
            )
        const row2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('one')
					.setLabel('Right')
					.setStyle('PRIMARY'),
			)
            .addComponents(
				new MessageButton()
					.setCustomId('two')
					.setLabel('Left')
					.setStyle('SECONDARY'),
            )
            .addComponents(
				new MessageButton()
					.setCustomId('yay')
					.setLabel('Yay')
					.setStyle('SUCCESS'),
            )
            .addComponents(
				new MessageButton()
					.setCustomId('no')
					.setLabel('Bruh')
					.setStyle('DANGER'),
            )
            .addComponents(
				new MessageButton()
					.setURL('https://discordjs.guide/')
					.setLabel('link: Discordjs.guide')
					.setStyle('LINK'),
            )
        const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setDescription('Some description here');
        await interaction.reply({content: "Testing", embeds: [embed], components: [row,row2]})
    }
}