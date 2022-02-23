const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot with a password.'),
	async execute(interaction, client) {
		await interaction.reply('STOP!');
		client.destroy()
		.then(() => process.exit())
	},
};
/*
const Discord = require("discord.js")
module.exports = {
    name: 'stop',
	guildOnly: true,
	permissions: "ADMINISTRATOR",
    args: true,
	usage: '<password>',
	execute(message, system, args) {	
		const stop_embed = new system.Discord.MessageEmbed()
		if(args[0] === system.config.bot_password){
			try{
				stop_embed
				.setColor(system.config.embed_colors.important)
				.addField(system.lang.stop.end_message, message.author)
				if (message.channel.type != 'dm') message.delete()
				message.channel.send(stop_embed)
				.then(() => system.client.destroy())
				.then(() => process.exit())
			} catch (error) {
				stop_embed
				.setColor(system.config.embed_colors.error)
				.addField(message.author, `\`${error.message}\``)
				message.channel.send(error_stop_embed);
			}
		}else{
			stop_embed
			.setColor(system.config.embed_colors.error)
			.addField(message.author.tag, `\`${system.lang.reboot.wrong_pass}\``)
			message.channel.send(stop_embed);
		}
    }
}*/