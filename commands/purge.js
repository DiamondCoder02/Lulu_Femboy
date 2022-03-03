const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge/clean/prune up to 99 messages.'),
	async execute(interaction) {
        const numberMenuDelete = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
			.setCustomId('select')
			.setPlaceholder('Nothing selected')
			.addOptions([{
					label: '25',
					description: 'Delete 25 message',
					value: '25',
				},{
					label: '50',
					description: 'Delete 50 message',
					value: '50',
				},{
					label: '75',
					description: 'Delete 75 message',
					value: '75',
				},{
					label: '99',
					description: 'Delete 99 message',
					value: '99',
				},
            ]),
        )
        await interaction.reply({ content: "Please select a number to delete messages.", components: [numberMenuDelete], ephemeral: true });
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'select') {
                await interaction.channel.bulkDelete(Number(i.values), true)
                console.log(`Successfully deleted ${Number(i.values)} messages.`)
            }
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        })
	},
};