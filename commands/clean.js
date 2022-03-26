const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clean')
		.setDescription('Purge/clean/prune up to 99 messages.'),
	async execute(interaction, client, config, lang) {
        let cl = lang.cl1.split('-')
        const numberToDelete = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId('25').setLabel('25').setStyle('SECONDARY'),
                new MessageButton().setCustomId('50').setLabel('50').setStyle('SECONDARY'),
                new MessageButton().setCustomId('75').setLabel('75').setStyle('SECONDARY'),
                new MessageButton().setCustomId('99').setLabel('99').setStyle('SECONDARY')
            )
        await interaction.reply({ content: cl[0], components: [numberToDelete]});
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 });
        collector.on('collect', async i => {
            await interaction.channel.bulkDelete(i.customId, true)
            await interaction.followUp({ content: cl[1] +" "+ i.customId})
            console.log(cl[1] + i.customId)
            collector.stop()
        })
	},
};