const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Gives role with button'),
    async execute(interaction, client, config) {
        let embed = new MessageEmbed()
            .setTitle("Ping Roles:")
            .setColor("#0099ff")
            .setDescription("`Click some button bellow if you want get notified!`")

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Acm')
                    .setLabel('sfw')
                    .setStyle('SECONDARY')
                    .setEmoji("📰"),
                new MessageButton()
                    .setCustomId('Gv')
                    .setLabel('nsfw')
                    .setStyle('SECONDARY')
                    .setEmoji("🎉")
            )
        const m = await interaction.reply({ embeds: [embed], components: [row] });

        const iFilter = i => i.user.id === message.author.id;

        const collector = m.createMessageComponentCollector({ filter: iFilter, time: 60000 })

        collector.on('collect', async i => {
            if (i.customId === 'Acm') {
                const role = message.guild.roles.cache.get("948322911419265024");
                if (i.member.roles.cache?.has('948322911419265024')) {
                    i.member.roles.remove('948322911419265024')
                    await i.reply({ content: `${role} was removed from you`, ephemeral: true });
                } else {
                    i.member.roles.add('948322911419265024')
                    await i.reply({ content: `${role} was added to you`, ephemeral: true });
                }
            } else if (i.customId === 'Gv') {
                const role = message.guild.roles.cache.get("948322955883069510");
                if (i.member.roles.cache?.has('948322955883069510')) {
                    i.member.roles.remove('948322955883069510')
                    await i.reply({ content: `${role} was removed from you`, ephemeral: true });
                } else {
                    i.member.roles.add('948322955883069510')
                    await i.reply({ content: `${role} was added to you`, ephemeral: true });
                }
            }
        })
        await collector.stop("complete")
    }
}