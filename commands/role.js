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
        if (Array.isArray(ro) && ro.length >0 ) { } else { return interaction.reply(`Guild configuration item "freeRoles" has not been set.`) }
        let m = []
        const role_embed = new MessageEmbed()
            .setTitle("Self Roles:")
            .setColor("#0099ff")
            .setDescription("`Click some button for roles!`")
        await interaction.reply({ embeds: [role_embed] })
        for (let x = 0; x < ro.length; x++){
            let role = await interaction.guild.roles.cache.find(r => r.name == ro[x])
            m.push(new MessageButton({
                customId: x,
                style: 'PRIMARY',
                label: role.name,
            }))
        }
        let x = m.length / 5, y = Math.floor(x+1), but = []
        if (y == x+1) { y-=1 }
        for (let i = 0; i < y; i++) {
            but = (new MessageActionRow({
                components: m.slice(i*5, (i+1)*5)
            }))
            console.log(but)
        }
        await interaction.editReply({ embed: [role_embed], components: [but] })
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
        collector.on('collect', async i => {
            let role = await interaction.guild.roles.cache.find(r => r.name == ro[i.customId])
            if (interaction.member.roles.cache?.has(role.id)) {
                interaction.member.roles.remove(role)
                await interaction.followUp({ content: `${role} was removed from you`, ephemeral: true });
            } else {
                interaction.member.roles.add(role)
                await interaction.followUp({ content: `${role} was added to you`, ephemeral: true });
            }
        });
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}