const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nekoslife = require('nekos.life');
const neko = new nekoslife();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nekoslife_sfw')
		.setDescription('Pictures from Nekoslife.')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The wholesome category')
                .addChoice('HeadPat', 'pat')
                .addChoice('Neko', 'neko')
                .addChoice('NekoGifs', 'nekoGif')
                .setRequired(true)
        ),
	async execute(interaction) {
            if (interaction.options.getString('category') === 'pat') {lewd = await neko.nsfw.pat()}
            if (interaction.options.getString('category') === 'neko') {lewd = await neko.nsfw.neko()}
            if (interaction.options.getString('category') === 'nekogif') {lewd = await neko.nsfw.nekoGif()}

            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('OwO, '+ interaction.options.getString('category'))
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146' })
                .setImage(lewd.url)
            await interaction.reply({embeds: [embed]})
    }
};