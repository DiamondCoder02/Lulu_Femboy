const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Server ping calculation.'),
	async execute(interaction, client) {
        let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor( (totalSeconds %= 86400) / 3600);
		let minutes = Math.floor( (totalSeconds%= 3600) / 60);
		let seconds = Math.floor(totalSeconds % 60);
        let uptime ="Days: " + days + ", Time: " + hours + ":" + minutes + ":" + seconds
        const msg = await interaction.reply({content: "Calculating ping...", fetchReply:true});
        ping = msg.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`Ping: \`` + ping + 'ms\`, Discord API: \`' + client.ws.ping + 'ms\`' + "\nUptime: " + uptime)
		
	}
}