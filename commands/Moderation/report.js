const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
module.exports = {
	cooldown: 60,
	guildOnly: true,
	data: new SlashCommandBuilder()
		.setName("report")
		.setDescription("Report a problem to admins or report a bot bug to me.")
		.addSubcommand(subcommand => subcommand.setName("guild").setDescription("If there is a problem with the guild or any member, report it here.")
			.addStringOption(option => option.setName("problem_with").setDescription("What is the problem with?")
				.addChoices(
					{ name: "Rules", value: "rule" },
					{ name: "User", value: "user" },
					{ name: "Channel", value: "channel" },
					{ name: "Voice", value: "voice" },
					{ name: "Role", value: "role" },
					{ name: "Other", value: "other" }
				).setRequired(true)
			)
			.addStringOption(option => option.setName("description").setDescription("Describe the problem.").setRequired(true))
			.addStringOption(option => option.setName("description_2").setDescription("If you want to add more details, describe them here."))
			.addStringOption(option => option.setName("fix").setDescription("Do you have a fix? If so, describe it here."))
		)
		.addSubcommand(subcommand => subcommand.setName("bot").setDescription("If there is a bug in the bot, report it to bot owner.")
			.addStringOption(option => option.setName("problem_with").setDescription("What is the problem with?")
				.addChoices(
					{ name: "Command_error", value: "commandError" },
					{ name: "Event_error", value: "eventError" },
					{ name: "Language_error", value: "languageError" },
					{ name: "Command_feature", value: "commandFeature" },
					{ name: "Event_feature", value: "eventFeature" },
					{ name: "Other", value: "otherError" }
				).setRequired(true)
			)
			.addStringOption(option => option.setName("description").setDescription("Describe the problem.").setRequired(true))
			.addStringOption(option => option.setName("description_2").setDescription("If you want to add more details, describe them here."))
			.addStringOption(option => option.setName("fix").setDescription("Do you have a fix? If so, describe it here."))
		),
	async execute(interaction, client) {
		const problem_with = interaction.options.getString("problem_with");
		const description = interaction.options.getString("description");
		const description_2 = interaction.options.getString("description_2");
		const fix = interaction.options.getString("fix");
		const report = new EmbedBuilder()
			.setDescription(description + "\n" + (description_2? description_2:"-") + "\n\n**Fix:**\n" + (fix? fix:"-"))
			.setColor([ 255, 0, 0 ])
			.addFields({ name: "Reported by ID:", value: `${interaction.user.id}`, inline: true })
			.setTimestamp()
			.setFooter({ text: "React with emoji to delete" })
			.setAuthor({ name: `Reported by ${String(interaction.user.tag)}`, iconURL: interaction.user.displayAvatarURL() });
		if (interaction.options.getSubcommand() === "guild") {
			report.setTitle("Guild Report about " + problem_with);
			let channel;
			if (client.settings.get(interaction.guild.id, "moderationChannel")) {channel = client.channels.cache.get(client.settings.get(interaction.guild.id, "moderationChannel"))} else {channel = interaction.guild.systemChannel}
			if (channel) {
				const s = await channel.send({ embeds: [report], fetchReply: true });
				s.react("<:red_cross:1008725354296389723>");
				await interaction.reply({ content: "Report has been sent to moderators", ephemeral: true });
			} else {
				const user = await client.users.fetch(interaction.guild.ownerId);
				const s = await user.send({ embeds: [report], fetchReply: true });
				s.react("<:red_cross:1008725354296389723>");
				await interaction.reply({ content: "No admin channel found, server owner got the message", ephemeral: true });
			}
		}
		if (interaction.options.getSubcommand() === "bot") {
			report.setTitle("Bot Bug Report" + "\n" + problem_with);
			try {
				require("dotenv").config(); let b_o_Id = process.env.botOwnerId;
				const user = await client.users.fetch(b_o_Id);
				const m = await user.send({ embeds: [report], fetchReply: true });
				m.react("<:red_cross:1008725354296389723>");
				await interaction.reply({ content: "Report has been sent to bot owner", ephemeral: true });
			} catch {
				await interaction.reply({ content: "No bot owner found, unable to report anything", ephemeral: true });
			}
		}
	}
};