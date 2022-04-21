const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageActionRow, MessageSelectMenu } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), cl = lang.clean.split('-'), pu = lang.purge.split('-')
module.exports = {
	guildOnly: true,
	permissions: "MANAGE_MESSAGES",
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription(pu[3]),
	async execute(interaction) {
        const numberMenuDelete = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
			.setCustomId('select')
			.setPlaceholder(pu[2])
			.addOptions([
				{label: '25' + pu[1], description: pu[0] +'25'+ pu[1],value: '25',},
				{label: '50' + pu[1], description: pu[0] +'50'+ pu[1],value: '50',},
				{label: '75' + pu[1], description: pu[0] +'75'+ pu[1],value: '75',},
				{label: '99' + pu[1], description: pu[0] +'99'+ pu[1],value: '99',}
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