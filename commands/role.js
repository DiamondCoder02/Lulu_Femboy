const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
    guildOnly: true,
    cooldown: 60,
    permissions: "MANAGE_ROLES",
	data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Gives roles with buttons'),
    async execute(interaction, client, config) {
        let ro = client.settings.get(interaction.guild.id, "freeRoles");
        if (Array.isArray(ro)) { } else { return interaction.reply(`Guild configuration item "freeRoles" has not been set.`) }
        console.log(ro)
        const role = interaction.guild.roles.find(r => r.name == ro)
        console.log(role)
        //member.roles.add(role);

        const role_embed = new MessageEmbed()
        .setTitle("Self Roles:")
        .setColor("#0099ff")
        .setDescription("`Click some button bellow if you want access to some good stuff!`")
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