const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Gives role with button'),
    async execute(interaction, client, config) {
        let embed = new MessageEmbed()
            .setTitle("Self Roles:")
            .setColor("#0099ff")
            .setDescription("`Click some button bellow if you want access to some good stuff!`")
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('role_sfw')
                    .setLabel('sfw')
                    .setStyle('SECONDARY')
                    .setEmoji('🧒'),
                new MessageButton()
                    .setCustomId('role_nsfw')
                    .setLabel('nsfw')
                    .setStyle('SECONDARY')
                    .setEmoji('🕵️')
            )
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'role_sfw') {
                const role = interaction.guild.roles.cache.get("948322911419265024");
                if (i.member.roles.cache?.has('948322911419265024')) {
                    i.member.roles.remove('948322911419265024')
                    await i.reply({ content: `${role} was removed from you`, ephemeral: true });
                } else {
                    i.member.roles.add('948322911419265024')
                    await i.reply({ content: `${role} was added to you`, ephemeral: true });
                }
            } else if (i.customId === 'role_nsfw') {
                const role = interaction.guild.roles.cache.get("948322955883069510");
                if (i.member.roles.cache?.has('948322955883069510')) {
                    i.member.roles.remove('948322955883069510')
                    await i.reply({ content: `${role} was removed from you`, ephemeral: true });
                } else {
                    i.member.roles.add('948322955883069510')
                    await i.reply({ content: `${role} was added to you`, ephemeral: true });
                }
            }
        })
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}