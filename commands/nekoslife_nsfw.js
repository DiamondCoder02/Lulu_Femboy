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
            const sfw_option = interaction.options.getString('category')
            console.log(sfw_option)
            console.log("Fuck0")
            if (sfw_option === 'hentai') {
                console.log("Fuck1")
                lewd = await neko.nsfw.hentai()
                console.log("Fuck2")
            }else if (interaction.options.getString() === 'femdom') {
                const lewd = await neko.nsfw.femdom()
            }else if (interaction.options.getString() === 'futa') {
                const lewd = await neko.nsfw.futa()
            }
            console.log("Fuck3")
            //const lewd = await neko.sfw.hug()
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('UwU')
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146' })
                .setImage(lewd.url)
            await interaction.reply({embeds: [embed]})
    }
};