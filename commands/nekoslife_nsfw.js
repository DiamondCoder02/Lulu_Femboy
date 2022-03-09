const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nekoslife = require('nekos.life');
const neko = new nekoslife();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nekoslife_nsfw')
		.setDescription('Pictures from Nekoslife !!!NSFW!!!')
        .addStringOption(option =>
            option.setName('lewd_category')
                .setDescription('The lewd category')
                .addChoice('RandomHentaiGif', 'randomHentaiGif')
                .addChoice('Pussy', 'pussy')
                .addChoice('NekoGif', 'nekoGif')
                .addChoice('Neko', 'neko')
                .addChoice('Lesbian', 'lesbian')
                .addChoice('Cumsluts', 'cumsluts')
                .addChoice('Classic', 'classic')
                .addChoice('Boobs', 'boobs')
                .addChoice('Bj', 'bj')
                .addChoice('Anal', 'anal')
                .addChoice('Yuri', 'yuri')
                .addChoice('Trap', 'trap')
                .addChoice('Tits', 'tits')
                .addChoice('GirlSoloGif', 'girlSoloGif')
                .addChoice('GirlSolo', 'girlSolo')
                .addChoice('PussyWankGif', 'pussyWankGif')
                .addChoice('Hentai', 'hentai')
                .addChoice('Futanari', 'futanari')
                .addChoice('Femdom', 'femdom')
                .addChoice('FeetGif', 'feetGif')
                .addChoice('Feet', 'feet')
                .addChoice('BlowJob', 'blowJob')
                .addChoice('Spank', 'spank')
                .addChoice('Gasm', 'gasm')
                .setRequired(true)
        )
        .addIntegerOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.')),
	async execute(interaction) {
        if (!interaction.channel.nsfw) {
            interaction.reply('Sorry, this is a Not Safe For Work command!'); return;
        }
        if (interaction.options.getInteger('repeat')) {
            amount = interaction.options.getInteger('repeat')
        } else amount = 1
        for (let a = 0; a < amount; ) {
            if (interaction.options.getString('lewd_category') === 'randomHentaiGif') {lewd = await neko.nsfw.randomHentaiGif()}
            if (interaction.options.getString('lewd_category') === 'pussy') {lewd = await neko.nsfw.pussy()}
            if (interaction.options.getString('lewd_category') === 'nekoGif') {lewd = await neko.nsfw.nekoGif()}
            if (interaction.options.getString('lewd_category') === 'neko') {lewd = await neko.nsfw.neko()}
            if (interaction.options.getString('lewd_category') === 'lesbian') {lewd = await neko.nsfw.lesbian()}
            if (interaction.options.getString('lewd_category') === 'cumsluts') {lewd = await neko.nsfw.cumsluts()}
            if (interaction.options.getString('lewd_category') === 'classic') {lewd = await neko.nsfw.classic()}
            if (interaction.options.getString('lewd_category') === 'boobs') {lewd = await neko.nsfw.boobs()}
            if (interaction.options.getString('lewd_category') === 'bj') {lewd = await neko.nsfw.bJ()}
            if (interaction.options.getString('lewd_category') === 'anal') {lewd = await neko.nsfw.anal()}
            if (interaction.options.getString('lewd_category') === 'yuri') {lewd = await neko.nsfw.yuri()}
            if (interaction.options.getString('lewd_category') === 'trap') {lewd = await neko.nsfw.trap()}
            if (interaction.options.getString('lewd_category') === 'tits') {lewd = await neko.nsfw.tits()}
            if (interaction.options.getString('lewd_category') === 'girlSoloGif') {lewd = await neko.nsfw.girlSoloGif()}
            if (interaction.options.getString('lewd_category') === 'girlSolo') {lewd = await neko.nsfw.girlSolo()}
            if (interaction.options.getString('lewd_category') === 'pussyWankGif') {lewd = await neko.nsfw.pussyWankGif()}
            if (interaction.options.getString('lewd_category') === 'hentai') {lewd = await neko.nsfw.hentai()}
            if (interaction.options.getString('lewd_category') === 'futanari') {lewd = await neko.nsfw.futanari()}
            if (interaction.options.getString('lewd_category') === 'femdom') {lewd = await neko.nsfw.femdom()}
            if (interaction.options.getString('lewd_category') === 'feetGif') {lewd = await neko.nsfw.feetGif()}
            if (interaction.options.getString('lewd_category') === 'feet') {lewd = await neko.nsfw.feet()}
            if (interaction.options.getString('lewd_category') === 'blowJob') {lewd = await neko.nsfw.blowJob()}
            if (interaction.options.getString('lewd_category') === 'spank') {lewd = await neko.nsfw.spank()}
            if (interaction.options.getString('lewd_category') === 'gasm') {lewd = await neko.nsfw.gasm()}
            
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('UwU, '+ interaction.options.getString('lewd_category'))
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096' })
                .setImage(lewd.url)
            try{
                await interaction.reply({ embeds: [embed]})
            }
            catch{
                await interaction.followUp({ embeds: [embed]})
            }
            //Make sure it won't loop forever so...
            a += 1
        }
    }
};