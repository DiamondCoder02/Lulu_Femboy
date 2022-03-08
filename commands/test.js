const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
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
		const menu = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.addOptions([
					{
						label: 'Select me',
						description: 'This is a description',
						value: 'first_option1',
					},
					{
						label: 'You can select me too',
						description: 'This is also a description',
						value: 'second_option1',
					},
				]),
		);
		const menu2 = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('select2')
				.setPlaceholder('Nothing selected')
				.setMinValues(2)
				.setMaxValues(3)
				.addOptions([
					{
						label: 'Select me',
						description: 'This is a description',
						value: 'first_option2',
					},
					{
						label: 'You can select me too',
						description: 'This is also a description',
						value: 'second_option2',
					},
					{
						label: 'I am also an option',
						description: 'This is a description as well',
						value: 'third_option2',
					},
				]),
		);
		const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle("Wut?")
        .setDescription(`BingBong`)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "Command:", value: "Bruh", inline:true},
            { name: "Idea:", value: "Head empty", inline:true}
		)
        .setTimestamp()
        .setFooter({text: `Ja`});
        await interaction.reply({content: "Testing", embeds: [embed], components: [row, row2, menu, menu2]})
    }
}