const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
module.exports = {
    cooldown: 30,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Server ping calculation.'),
	async execute(interaction, client, config, lang) {
        let p = lang.ping.split('-')
        let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor( (totalSeconds %= 86400) / 3600);
		let minutes = Math.floor( (totalSeconds%= 3600) / 60);
		let seconds = Math.floor(totalSeconds % 60);
        let uptime = p[0] + "\`" + days + "\`, \n" +p[1]+ "\`" + hours + ":" + minutes + ":" + seconds + "\`"
        const msg = await interaction.reply({content: p[2], fetchReply:true});
        ping = msg.createdTimestamp - interaction.createdTimestamp;
		const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(p[4])
            .setTimestamp()
            .addFields(
                {name: "Ping:", value: `\`` + ping + 'ms\`', inline:true},
                {name: "Discord API:", value: '\`' + client.ws.ping + 'ms\`', inline:true},
                {name: p[5], value: uptime},
            )
        await interaction.editReply({content: p[3], embeds: [embed]})
	}
}