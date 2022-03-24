const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clean')
		.setDescription('Purge/clean/prune up to 99 messages.'),
	async execute(interaction) {
        const numberToDelete = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId('25').setLabel('25').setStyle('SECONDARY'),
                new MessageButton().setCustomId('50').setLabel('50').setStyle('SECONDARY'),
                new MessageButton().setCustomId('75').setLabel('75').setStyle('SECONDARY'),
                new MessageButton().setCustomId('99').setLabel('99').setStyle('SECONDARY')
            )
        await interaction.reply({ content: "Please select a number to delete messages.", components: [numberToDelete]});
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 });
        collector.on('collect', async i => {
            if (i.customId === '25') {
                await interaction.channel.bulkDelete(25, true)
                await interaction.followUp({ content: `Successfully deleted messages: ` + i.customId})
            } else if (i.customId === '50') {
                await interaction.channel.bulkDelete(50, true)
                await interaction.followUp({ content: `Successfully deleted messages: ` + i.customId})
            } else if (i.customId === '75') {
                await interaction.channel.bulkDelete(75, true)
                await interaction.followUp({ content: `Successfully deleted messages: ` + i.customId})
            } else if (i.customId === '99') {
                await interaction.channel.bulkDelete(99, true)
                await interaction.followUp({ content: `Successfully deleted messages: ` + i.customId})
            }
            console.log(`Successfully deleted messages: ` + i.customId)
            collector.stop()
        })
	},
};