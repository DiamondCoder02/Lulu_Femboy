const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const nekoslife = require('nekos.life');
const neko = new nekoslife();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nekoslife_nsfw_ace')
		.setDescription('Pictures from Nekoslife !!!NSFW!!! (Page 2)')
        .addStringOption(option =>
            option.setName('lewd_category')
                .setDescription('The lewd art, characther and ero category')
                .addChoice('Pussy Art', 'pussyArt')
                .addChoice('Cum Arts', 'cumArts')
                .addChoice('Avatar', 'avatar')
                .addChoice('Kuni', 'kuni')
                .addChoice('Kemonomimi', 'kemonomimi')
                .addChoice('Kitsune', 'kitsune')
                .addChoice('Keta', 'keta')
                .addChoice('Holo', 'holo')
                .addChoice('Holo Ero', 'holoEro')
                .addChoice('Ero Feet', 'eroFeet')
                .addChoice('Ero', 'ero')
                .addChoice('Ero Kitsune', 'eroKitsune')
                .addChoice('Ero Kemonomimi', 'eroKemonomimi')
                .addChoice('Ero Neko', 'eroNeko')
                .addChoice('Ero Yuri', 'eroYuri')
                .setRequired(true)
        )
        .addNumberOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.').setMinValue(1).setMaxValue(10)),
	async execute(interaction) {
        var amount = Number(interaction.options.getNumber('repeat'));
        if (interaction.options.getNumber('repeat')) {
            amount = Number(interaction.options.getNumber('repeat'))
        } else amount = 1
        if (!interaction.channel.nsfw) {
            interaction.reply('Sorry, this is a Not Safe For Work command!'); return;
        }
        for (let a = 0; a < amount; ) {
            if (interaction.options.getString('lewd_category') === 'pussyArt') {lewd = await neko.nsfw.pussyArt()}
            if (interaction.options.getString('lewd_category') === 'cumArts') {lewd = await neko.nsfw.cumArts()}
            if (interaction.options.getString('lewd_category') === 'avatar') {lewd = await neko.nsfw.avatar()}
            if (interaction.options.getString('lewd_category') === 'kuni') {lewd = await neko.nsfw.kuni()}
            if (interaction.options.getString('lewd_category') === 'kemonomimi') {lewd = await neko.nsfw.kemonomimi()}
            if (interaction.options.getString('lewd_category') === 'kitsune') {lewd = await neko.nsfw.kitsune()}
            if (interaction.options.getString('lewd_category') === 'keta') {lewd = await neko.nsfw.keta()}
            if (interaction.options.getString('lewd_category') === 'holo') {lewd = await neko.nsfw.holo()}
            if (interaction.options.getString('lewd_category') === 'holoEro') {lewd = await neko.nsfw.holoEro()}
            if (interaction.options.getString('lewd_category') === 'eroFeet') {lewd = await neko.nsfw.eroFeet()}
            if (interaction.options.getString('lewd_category') === 'ero') {lewd = await neko.nsfw.ero()}
            if (interaction.options.getString('lewd_category') === 'eroKitsune') {lewd = await neko.nsfw.eroKitsune()}
            if (interaction.options.getString('lewd_category') === 'eroKemonomimi') {lewd = await neko.nsfw.eroKemonomimi()}
            if (interaction.options.getString('lewd_category') === 'eroNeko') {lewd = await neko.nsfw.eroNeko()}
            if (interaction.options.getString('lewd_category') === 'eroYuri') {lewd = await neko.nsfw.eroYuri()}
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
                await wait(1000)
                await interaction.followUp({ embeds: [embed]})
            }
            //Make sure it won't loop forever so...
            a += 1
        }
    }
};