const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
    guildOnly: true,
    cooldown: 60,
    //permissions: "MANAGE_ROLES",
	data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Gives roles with buttons'),
    async execute(interaction, client, config) {
        let ro = client.settings.get(interaction.guild.id, "freeRoles");
        if (Array.isArray(ro) && ro.length >0) { } else { return interaction.reply(`Guild configuration item "freeRoles" has not been set.`) }
        if (ro.includes('')) { return interaction.reply(`Guild configuration item "freeRoles" has not been set.`) }
        let m = []
        const role_embed = new MessageEmbed()
            .setTitle("Self Roles:")
            .setColor("#0099ff")
            .setDescription("`Click some button for roles!`")
        await interaction.reply({ embeds: [role_embed], ephemeral: true })
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
        for (let i = 0; i < y; i++) { but.push(new MessageActionRow({ components: m.slice(i*5, (i+1)*5) })) }
		if (but.length === 1) { await interaction.editReply({ embed: [role_embed], components: but })
		} else if (but.length == 2) { await interaction.editReply({ embed: [role_embed], components: [but[0], but[1]] })
		} else if (but.length == 3) { await interaction.editReply({ embed: [role_embed], components: [but[0], but[1], but[2]] })
		} else if (but.length == 4) { await interaction.editReply({ embed: [role_embed], components: [but[0], but[1], but[2], but[3]] })
		} else if (but.length == 5) { await interaction.editReply({ embed: [role_embed], components: [but[0], but[1], but[2], but[3], but[4]] })
		} else { console.log("God help you."); await interaction.editReply({ content: "Sorry, cannot have more than 25 roles", ephemeral: true })
		}
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
            i.update({components: interaction.components})
        });
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}