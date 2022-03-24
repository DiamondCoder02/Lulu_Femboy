const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
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
        let uptime ="Days: \`" + days + "\`, \nTime: \`" + hours + ":" + minutes + ":" + seconds + "\`"
        const msg = await interaction.reply({content: "Calculating ping...", fetchReply:true});
        ping = msg.createdTimestamp - interaction.createdTimestamp;
		const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Ping and uptime')
            .setTimestamp()
            .addFields(
                {name: "Ping:", value: `\`` + ping + 'ms\`', inline:true},
                {name: "Discord API:", value: '\`' + client.ws.ping + 'ms\`', inline:true},
                {name: "Uptime:", value: uptime},
            )
        await interaction.editReply({content: "**Ping Calculated!**", embeds: [embed]})
	}
}