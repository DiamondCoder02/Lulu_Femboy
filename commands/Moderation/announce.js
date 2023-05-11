const { PermissionFlagsBits, TextInputStyle, SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, EmbedBuilder, InteractionType } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("announce")
		.setDescription("Make an announcement to a channel.")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.addChannelOption(option => option.setName("channel").setDescription("The channel to send the announcement to.").setRequired(true))
		.addRoleOption(option => option.setName("role").setDescription("The role to ping.")),
	async execute(interaction, client) {
		const modal = new ModalBuilder()
			.setCustomId("announce")
			.setTitle("Announcement");
		const title = new TextInputBuilder()
			.setCustomId("title")
			.setLabel("What's the title?")
			.setStyle(TextInputStyle.Short)
			.setRequired(true);
		const description = new TextInputBuilder()
			.setCustomId("description")
			.setLabel("What's the announcement?")
			.setStyle(TextInputStyle.Paragraph);
		const firstActionRow = new ActionRowBuilder().addComponents(title);
		const secondActionRow = new ActionRowBuilder().addComponents(description);
		modal.addComponents(firstActionRow, secondActionRow);
		await interaction.showModal(modal);
	}
};