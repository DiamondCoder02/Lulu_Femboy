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
        //member.roles.add(role);

        const role_embed = new MessageEmbed()
            .setTitle("Self Roles:")
            .setColor("#0099ff")
            .setDescription("`Click some button for roles!`")
        let m = []
        for (let x = 0; x < 5; x++){
            let roles = interaction.guild.roles.cache.filter(r => r.name == ro[x])
            m.push(new MessageButton({
                customId: x,
                style: 'PRIMARY',
                label: roles.name,
            }))
            console.log(roles)
            console.log(m)
            //const current = ro.slice(start, start + 5)
            /*
            let row = new MessageActionRow()({ components: [ 
                new MessageButton({
                    customId: x,
                    style: 'PRIMARY',
                    label: roles.name,
                })
            ]})
            //console.log(current)
            
            console.log(row)
            */
        };
        interaction.reply({ embed: role_embed })

		const forwardId = 'forward'
		const forwardButton = new MessageButton({
			style: 'SECONDARY',
			label: 'Forward',
			emoji: '➡️',
			customId: forwardId
		})
        const generateEmbed = async start => {
			const current = ro.slice(start, start + 5)
			return new MessageEmbed({
				title: `Showing guilds ${start + 1}-${start + current.length} out of ${ro.length}`,
				fields: await Promise.all( current.map( async ro => ({ name: ro, value: `${ro}` }) ))
			})
		}
        const moreThan5 = ro.length <= 5
        await interaction.channel.send({
			embeds: [await generateEmbed(0)],
			components: moreThan5 ? [] : [new MessageActionRow({ components: [forwardButton] })]
		})
		if (moreThan5) return


        /*
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
        */
    }
}