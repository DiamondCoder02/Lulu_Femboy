const { SlashCommandBuilder } = require("@discordjs/builders"), { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
module.exports = {
	guildOnly: true,
	cooldown: 60,
	// Permissions: "MANAGE_ROLES",
	data: new SlashCommandBuilder()
		.setName("role")
		.setDescription("Gives roles (just send the message, then click the buttons)"),
	async execute(interaction, client) {
		let ro = client.settings.get(interaction.guild.id, "freeRoles");
		if (Array.isArray(ro) && ro.length >0) { } else { return interaction.reply("Guild configuration item \"freeRoles\" has not been set.") }
		if (ro.includes("")) { return interaction.reply("Guild configuration item \"freeRoles\" has not been set.") }
		let m = [];
		const role_embed = new EmbedBuilder()
			.setTitle("Self Roles:")
			.setColor("#00FF00 ")
			.setDescription("`Click some button for roles!`");
		await interaction.reply({ embeds: [role_embed], ephemeral: true });
		for (let x = 0; x < ro.length; x++){
			let role = await interaction.guild.roles.cache.get(ro[x]);
			m.push(new ButtonBuilder({
				customId: x,
				style: ButtonStyle.Primary,
				label: role.name
			}));
		}
		let x = m.length / 5, y = Math.floor(x+1), but = [];
		if (y == x+1) { y-=1 }
		for (let i = 0; i < y; i++) { but.push(new ActionRowBuilder({ components: m.slice(i*5, (i+1)*5) })) }
		switch (but.length) {
		case 1: await interaction.editReply({ embeds: [role_embed], components: [but[0]] }); break;
		case 2: await interaction.editReply({ embeds: [role_embed], components: [ but[0], but[1] ] }); break;
		case 3: await interaction.editReply({ embeds: [role_embed], components: [ but[0], but[1], but[2] ] }); break;
		case 4: await interaction.editReply({ embeds: [role_embed], components: [ but[0], but[1], but[2], but[3] ] }); break;
		case 5: await interaction.editReply({ embeds: [role_embed], components: [ but[0], but[1], but[2], but[3], but[4] ] }); break;
		default: console.log("God help you."); await interaction.editReply({ content: "Sorry, cannot have more than 25 roles", ephemeral: true }); break;
		}
		const filter = i => i.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
		collector.on("collect", async i => {
			let role = await interaction.guild.roles.cache.get(ro[i.customId]);
			if (interaction.member.roles.cache?.has(role.id)) {
				interaction.member.roles.remove(role);
				await interaction.followUp({ content: `${role} was removed from you`, ephemeral: true });
			} else {
				interaction.member.roles.add(role);
				await interaction.followUp({ content: `${role} was added to you`, ephemeral: true });
			}
			i.update({components: interaction.components});
		});
		// Collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	}
};