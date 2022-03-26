const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge/clean/prune up to 99 messages.'),
	async execute(interaction, client, config, lang) {
		let cl = lang.cl1.split('-')
		let pu = lang.pu3.split('-')
        const numberMenuDelete = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
			.setCustomId('select')
			.setPlaceholder('Nothing selected')
			.addOptions([
				{label: '25' + pu[1],description: pu[0] +'25'+ pu[1],value: '25',},
				{label: '50' + pu[1],description: pu[0] +'50'+ pu[1],value: '50',},
				{label: '75' + pu[1],description: pu[0] +'75'+ pu[1],value: '75',},
				{label: '99' + pu[1],description: pu[0] +'99'+ pu[1],value: '99',}
            ]),
        )
        await interaction.reply({ content: cl[0], components: [numberMenuDelete]});
        const filter = i => i.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({ filter })
        collector.on('collect', async i => {
			await interaction.deleteReply()
			await interaction.channel.bulkDelete(Number(i.values), true)
			await interaction.followUp({ content: cl[1] +" "+ Number(i.values)})
			collector.stop()
        })
	}
}