const { PermissionFlagsBits, TextInputStyle, SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("announce")
		.setDescription("Make an announcement to a channel.")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.addChannelOption(option => option.setName("channel").setDescription("The channel to send the announcement to.").setRequired(true))
		.addRoleOption(option => option.setName("role").setDescription("The role to ping.")),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId("announce")
			.setTitle("Announcement");
		const title = new TextInputBuilder()
			.setCustomId("title")
			.setLabel("What's the title?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("Title for the announcement. (required)")
			.setRequired(true);
		const description = new TextInputBuilder()
			.setCustomId("description")
			.setLabel("What's the announcement?")
			.setStyle(TextInputStyle.Paragraph)
			.setPlaceholder("Write your announcement here. (required)")
			.setRequired(true);
		const smallnote = new TextInputBuilder()
			.setCustomId("smallnote")
			.setLabel("Want a small note at the bottom?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("Small note at the bottom.")
			.setRequired(false);
		const firstActionRow = new ActionRowBuilder().addComponents(title);
		const secondActionRow = new ActionRowBuilder().addComponents(description);
		const bottomActionRow = new ActionRowBuilder().addComponents(smallnote);
		modal.addComponents(firstActionRow, secondActionRow, bottomActionRow);
		await interaction.showModal(modal);
	}
};