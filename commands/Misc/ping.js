const { SlashCommandBuilder } = require("@discordjs/builders"), { EmbedBuilder } = require("discord.js");
const package = require("../package.json");
module.exports = {
	cooldown: 30,
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Server ping calculation."),
	async execute(interaction, client) {
		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor((totalSeconds %= 86400) / 3600);
		let minutes = Math.floor((totalSeconds%= 3600) / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = "Days:\`" + days + "\`,\nTime: \`" + hours + ":" + minutes + ":" + seconds + "\`";
		const msg = await interaction.reply({content: "Calculating ping...", fetchReply: true});
		ping = msg.createdTimestamp - interaction.createdTimestamp;
		const embed = new EmbedBuilder()
			.setColor("#00FF00")
			.setTitle("Ping and uptime")
			.setTimestamp()
			.addFields(
				{name: "Ping:", value: "`" + ping + "ms\`", inline: true},
				{name: "Discord API:", value: "\`" + client.ws.ping + "ms\`", inline: true},
				{name: "Uptime:", value: uptime+`\n\n__Since:__ \n<t:${Math.floor(client.readyTimestamp / 1000)}:F> \n(<t:${Math.floor(client.readyTimestamp / 1000)}:R>)`},
				{name: "Problem?:", value: "Check discord own status: [here](https://discordstatus.com/)"}
			)
			.setFooter({text: `Version: ${package.version}`});
		await interaction.editReply({content: "**Ping calculated!**", embeds: [embed]});
	}
};