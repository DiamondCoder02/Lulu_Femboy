const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const nekoslife = require('nekos.life'), neko = new nekoslife();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nekoslife_sfw')
		.setDescription('Pictures from Nekoslife.')
        .addStringOption(option => option.setName('category')
            .setDescription('The wholesome category')
            .addChoice('Tickle', 'tickle')
            .addChoice('Slap', 'slap')
            .addChoice('Poke', 'poke')
            .addChoice('Pat', 'pat')
            .addChoice('Neko', 'neko')
            .addChoice('Meow', 'meow')
            .addChoice('Lizard', 'lizard')
            .addChoice('Kiss', 'kiss')
            .addChoice('Hug', 'hug')
            .addChoice('Fox Girl', 'foxGril')
            .addChoice('Feed', 'feed')
            .addChoice('Cuddle', 'cuddle')
            .addChoice('Neko Gif', 'nekoGif')
            .addChoice('Kemonomimi', 'kemonomini')
            .addChoice('Holo', 'holo')
            .addChoice('Smug', 'smug')
            .addChoice('Baka', 'baka')
            .addChoice('Woof', 'woof')
            .addChoice('Wallpaper', 'wallpaper')
            .addChoice('Goose', 'goose')
            .addChoice('Gecg?', 'gecg')
            .addChoice('Avatar / Profile Pictures', 'avatar')
            .addChoice('Waifus', 'waifu')
            .setRequired(true))
        .addUserOption(option => option.setName('target').setDescription('Ping your friend if you want.'))
        .addNumberOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.').setMinValue(1).setMaxValue(10)),
	async execute(interaction) {
        if (interaction.options.getNumber('repeat')) {
            var amount = Number(interaction.options.getNumber('repeat'))
        } else var amount = 1
        for (let a = 0; a < amount; ) {
            if (interaction.options.getString('category') === 'tickle') {lewd = await neko.sfw.tickle()}
            if (interaction.options.getString('category') === 'slap') {lewd = await neko.sfw.slap()}
            if (interaction.options.getString('category') === 'poke') {lewd = await neko.sfw.poke()}
            if (interaction.options.getString('category') === 'pat') {lewd = await neko.sfw.pat()}
            if (interaction.options.getString('category') === 'neko') {lewd = await neko.sfw.neko()}
            if (interaction.options.getString('category') === 'meow') {lewd = await neko.sfw.meow()}
            if (interaction.options.getString('category') === 'lizard') {lewd = await neko.sfw.lizard()}
            if (interaction.options.getString('category') === 'kiss') {lewd = await neko.sfw.kiss()}
            if (interaction.options.getString('category') === 'hug') {lewd = await neko.sfw.hug()}
            if (interaction.options.getString('category') === 'foxGirl') {lewd = await neko.sfw.foxGirl()}
            if (interaction.options.getString('category') === 'feed') {lewd = await neko.sfw.feed()}
            if (interaction.options.getString('category') === 'cuddle') {lewd = await neko.sfw.cuddle()}
            if (interaction.options.getString('category') === 'nekoGif') {lewd = await neko.sfw.nekoGif()}
            if (interaction.options.getString('category') === 'kemonomimi') {lewd = await neko.sfw.kemonomimi()}
            if (interaction.options.getString('category') === 'holo') {lewd = await neko.sfw.hole()}
            if (interaction.options.getString('category') === 'smug') {lewd = await neko.sfw.smug()}
            if (interaction.options.getString('category') === 'baka') {lewd = await neko.sfw.baka()}
            if (interaction.options.getString('category') === 'woof') {lewd = await neko.sfw.woof()}
            if (interaction.options.getString('category') === 'wallpaper') {lewd = await neko.sfw.wallpaper()}
            if (interaction.options.getString('category') === 'goose') {lewd = await neko.sfw.goose()}
            if (interaction.options.getString('category') === 'gecg') {lewd = await neko.sfw.gecg()}
            if (interaction.options.getString('category') === 'avatar') {lewd = await neko.sfw.avatar()}
            if (interaction.options.getString('category') === 'waifu') {lewd = await neko.sfw.waifu()}
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle("OwO, " + interaction.options.getString('category'))
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096' })
                .setImage(lewd.url)
            if (interaction.options.getUser('target')) {
                const user = interaction.options.getUser('target'), from = interaction.user
                embed.setDescription(`UwU! From ${from.toString()} to ${user.toString()}. A nice ` + interaction.options.getString('category')+ " to you. :3")
                try{ await interaction.reply({ content: user.toString(), embeds: [embed]}) }
                catch{
                    await wait(1000)
                    await interaction.followUp({ embeds: [embed]})
                }
            } else {
                try{ await interaction.reply({ embeds: [embed]}) }
                catch{
                    await wait(1000)
                    await interaction.followUp({ embeds: [embed]})
                }
            }
            //Make sure it won't loop forever so...
            a += 1
        }
    }
};

/* wholesome nekoslife function that I probably never use
spoiler: [AsyncFunction (anonymous)],
why: [AsyncFunction (anonymous)],
catText: [AsyncFunction (anonymous)],
OwOify: [AsyncFunction (anonymous)],
eightBall: [AsyncFunction (anonymous)],
fact: [AsyncFunction (anonymous)],
*/