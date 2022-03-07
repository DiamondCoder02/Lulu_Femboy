const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nekoslife = require('nekos.life');
const neko = new nekoslife();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nekoslife_nsfw')
		.setDescription('Pictures from Nekoslife !!!NSFW!!!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The lewd category')
                .addChoice('Hentai', 'hentai')
                .addChoice('Femdom', 'femdom')
                .addChoice('Futa', 'futa')
                .setRequired(true)
        ),
	async execute(interaction) {
            if (interaction.options.getString('category') === 'hentai') {lewd = await neko.nsfw.hentai()}
            if (interaction.options.getString('category') === 'femdom') {lewd = await neko.nsfw.femdom()}
            if (interaction.options.getString('category') === 'futa') {lewd = await neko.nsfw.futanari()}

            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('UwU, '+ interaction.options.getString('category'))
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146' })
                .setImage(lewd.url)
            await interaction.reply({embeds: [embed]})
    }
};