const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
    guildOnly: true,
	data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Gives roles with buttons'),
        //.addSubcommand(subcommand => subcommand.setName('safe_for_work').setDescription('Wholesome roles that you can get.'))
        //.addSubcommand(subcommand => subcommand.setName('not_safe_for_work').setDescription('Lewd roles for all you naughty.')),
    async execute(interaction, config) {
        const role_embed = new MessageEmbed()
        .setTitle("Self Roles:")
        .setColor("#0099ff")
        .setDescription("`Click some button bellow if you want access to some good stuff!`")
        /*if (interaction.options.getSubcommand() === 'safe_for_work') {
            
        }
        if (interaction.options.getSubcommand() === 'not_safe_for_work') {
            if (!interaction.channel.nsfw) { interaction.reply({content:'Sorry, this is a Not Safe For Work command!', ephemeral: true}); return }
            
        }*/


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId('role_sfw').setLabel('sfw').setStyle('SECONDARY').setEmoji('🧒'),
                new MessageButton().setCustomId('role_nsfw').setLabel('nsfw').setStyle('SECONDARY').setEmoji('🕵️')
            )
        await interaction.reply({ embeds: [role_embed], components: [row], ephemeral: true });
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 });
        collector.on('collect', async i => {
            if (i.customId === 'role_sfw') {
                const role = interaction.guild.roles.cache.get("948322911419265024");
                if (i.member.roles.cache?.has(role)) {
                    i.member.roles.remove(role)
                    await i.reply({ content: `${role} was removed from you`, ephemeral: true });
                } else {
                    i.member.roles.add(role)
                    await i.reply({ content: `${role} was added to you`, ephemeral: true });
                }
            } else if (i.customId === 'role_nsfw') {
                const role = interaction.guild.roles.cache.get("948322955883069510");
                if (i.member.roles.cache?.has(role)) {
                    i.member.roles.remove(role)
                    await i.reply({ content: `${role} was removed from you`, ephemeral: true });
                } else {
                    i.member.roles.add(role)
                    await i.reply({ content: `${role} was added to you`, ephemeral: true });
                }
            }
        })
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}