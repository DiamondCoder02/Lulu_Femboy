const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const nekoslife = require('nekos.life'), neko = new nekoslife();
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('nekoslife')
		.setDescription('Pictures from Nekoslife.')
        .addSubcommand(subcommand => subcommand
            .setName('wholesome')
            .setDescription("Pictures for the wholesome.")
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
                .addChoice('Genetically Engineered CatGirl', 'gecg')
                .addChoice('Avatar / Profile Pictures', 'avatar')
                .addChoice('Waifus', 'waifu')
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription('Ping your friend if you want.'))
            .addNumberOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.').setMinValue(1).setMaxValue(10)))
        .addSubcommand(subcommand => subcommand
            .setName('nsfw')
            .setDescription("Pictures for the horny.")
            .addStringOption(option => option.setName('lewd_category')
                .setDescription('The lewd category')
                .addChoice('Random Hentai Gif', 'randomHentaiGif')
                .addChoice('Pussy', 'pussy')
                .addChoice('Neko Gif', 'nekoGif')
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
                .addChoice('Girl Solo Gif', 'girlSoloGif')
                .addChoice('Girl Solo', 'girlSolo')
                .addChoice('Pussy Masturbation Gif', 'pussyWankGif')
                .addChoice('Hentai', 'hentai')
                .addChoice('Futanari', 'futanari')
                .addChoice('Femdom', 'femdom')
                .addChoice('Feet Gif', 'feetGif')
                .addChoice('Feet', 'feet')
                .addChoice('BlowJob', 'blowJob')
                .addChoice('Spank', 'spank')
                .addChoice('Orgasm', 'gasm')
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.').setMinValue(1).setMaxValue(10)))
        .addSubcommand(subcommand => subcommand
            .setName('nsfw2')
            .setDescription("Pictures for the lewd.")
            .addStringOption(option => option.setName('lewd_category2')
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
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.').setMinValue(1).setMaxValue(10)))
        .addSubcommand(subcommand => subcommand
            .setName('other')
            .setDescription("Other nekoslife stuff.")
            .addStringOption(option => option.setName('other_category')
                .setDescription('The other category')
                .addChoice('Why', 'why')
                .addChoice('CatText', 'catText')
                .addChoice('OwOify', 'OwOify')
                .addChoice('8ball', 'eightBall')
                .addChoice('Fact', 'fact')
                .addChoice('Spoiler', 'spoiler')
                .setRequired(true))
            .addStringOption(option => option.setName('text').setDescription('The text you need for OwOify and 8ball'))
        ),
	async execute(interaction, client, config, lang) {
        let nl = lang.nekoslife.split('-')
        if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
        for (let a = 0; a < amount; ) {
            if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT' && (interaction.options.getString('lewd_category2') || interaction.options.getString('lewd_category'))) {interaction.reply('Sorry, this is a Not Safe For Work command!'); return;}
            if (interaction.options.getString('lewd_category2')) { c = interaction.options.getString('lewd_category2')}
            if (interaction.options.getString('lewd_category')) { c = interaction.options.getString('lewd_category')}
            if (interaction.options.getString('category')) { c = interaction.options.getString('category')}
            if (interaction.options.getString('other_category')) { c = interaction.options.getString('other_category')}
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle("OwO, " + c)
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096' })
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
            if (interaction.options.getString('lewd_category2') === 'pussyArt') {lewd = await neko.nsfw.pussyArt()}
            if (interaction.options.getString('lewd_category2') === 'cumArts') {lewd = await neko.nsfw.cumArts()}
            if (interaction.options.getString('lewd_category2') === 'avatar') {lewd = await neko.nsfw.avatar()}
            if (interaction.options.getString('lewd_category2') === 'kuni') {lewd = await neko.nsfw.kuni()}
            if (interaction.options.getString('lewd_category2') === 'kemonomimi') {lewd = await neko.nsfw.kemonomimi()}
            if (interaction.options.getString('lewd_category2') === 'kitsune') {lewd = await neko.nsfw.kitsune()}
            if (interaction.options.getString('lewd_category2') === 'keta') {lewd = await neko.nsfw.keta()}
            if (interaction.options.getString('lewd_category2') === 'holo') {lewd = await neko.nsfw.holo()}
            if (interaction.options.getString('lewd_category2') === 'holoEro') {lewd = await neko.nsfw.holoEro()}
            if (interaction.options.getString('lewd_category2') === 'eroFeet') {lewd = await neko.nsfw.eroFeet()}
            if (interaction.options.getString('lewd_category2') === 'ero') {lewd = await neko.nsfw.ero()}
            if (interaction.options.getString('lewd_category2') === 'eroKitsune') {lewd = await neko.nsfw.eroKitsune()}
            if (interaction.options.getString('lewd_category2') === 'eroKemonomimi') {lewd = await neko.nsfw.eroKemonomimi()}
            if (interaction.options.getString('lewd_category2') === 'eroNeko') {lewd = await neko.nsfw.eroNeko()}
            if (interaction.options.getString('lewd_category2') === 'eroYuri') {lewd = await neko.nsfw.eroYuri()}
            if (interaction.options.getString('other_category') === 'why') {lewd = await neko.sfw.why(); let text = lewd.why; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('other_category') === 'catText') {lewd = await neko.sfw.catText(); const text = lewd.cat; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('other_category') === 'OwOify') {lewd = await neko.sfw.OwOify({text: interaction.options.getString('text')}); const text = lewd.owo ; if(interaction.options.getString('text')){ embed.setDescription(text); return interaction.reply({embeds: [embed]}) } else{ return interaction.reply('Please give me a tag for OwOify and 8ball')}}
            if (interaction.options.getString('other_category') === 'eightBall') {lewd = await neko.sfw.eightBall({text: interaction.options.getString('text')}); const text = lewd.response ; if(interaction.options.getString('text')){ embed.setDescription("**"+interaction.options.getString('text')+"**\n"+text); return interaction.reply({embeds: [embed]}) } else{ return interaction.reply('Please give me a tag for OwOify and 8ball')}}
            if (interaction.options.getString('other_category') === 'fact') {lewd = await neko.sfw.fact(); const text = lewd.fact; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('other_category') === 'spoiler') {lewd = await neko.sfw.spoiler(); const text = lewd.msg; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            embed.setImage(lewd.url)
            if (interaction.options.getUser('target')) {
                const user = interaction.options.getUser('target'), from = interaction.user
                embed.setDescription(from.toString() + nl[0] + interaction.options.getString('category') + nl[1] + user.toString() + ". :3")
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