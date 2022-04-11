const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
const sd = lang.nekoslife.slash_desc.split('-'), de = lang.nekoslife.desc.split('-'), er = lang.nekoslife.error_reply
const wait = require('node:timers/promises').setTimeout;
const nekoslife = require('nekos.life'), neko = new nekoslife();
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('nekoslife')
		.setDescription(sd[0])
        .addSubcommand(subcommand => subcommand
            .setName('wholesome')
            .setDescription(sd[1])
            .addStringOption(option => option.setName("sfw_w")
                .setDescription(de[0])
                .addChoice('Baka', 'baka')
                .addChoice('Cuddle', 'cuddle')
                .addChoice('Feed', 'feed')
                .addChoice('Fox Girl', 'foxGril')
                .addChoice('Holo', 'holo')
                .addChoice('Hug', 'hug')
                .addChoice('Kiss', 'kiss')
                .addChoice('Meow', 'meow')
                .addChoice('Neko', 'neko')
                .addChoice('Neko Gif', 'nekoGif')
                .addChoice('Pat', 'pat')
                .addChoice('Poke', 'poke')
                .addChoice('Slap', 'slap')
                .addChoice('Smug', 'smug')
                .addChoice('Tickle', 'tickle')
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription(de[2]))
            .addNumberOption(option => option.setName('repeat').setDescription(de[3]).setMinValue(1).setMaxValue(10))
        ).addSubcommand(subcommand => subcommand
            .setName('sfw_other')
            .setDescription(sd[2])
            .addStringOption(option => option.setName("sfw_o")
                .setDescription(de[0])
                .addChoice('8ball', 'eightBall')
                .addChoice('Avatar / Profile Pictures', 'avatar')
                .addChoice('CatText', 'catText')
                .addChoice('Fact', 'fact')
                .addChoice('Genetically Engineered CatGirl', 'gecg')
                .addChoice('Goose', 'goose')
                .addChoice('Kemonomimi', 'kemonomini')
                .addChoice('Lizard', 'lizard')
                .addChoice('OwOify', 'OwOify')
                .addChoice('Spoiler', 'spoiler')
                .addChoice('Waifus', 'waifu')
                .addChoice('Wallpaper', 'wallpaper')
                .addChoice('Why', 'why')
                .addChoice('Woof', 'woof')
                .setRequired(true))
            .addStringOption(option => option.setName('text').setDescription(er))
            .addNumberOption(option => option.setName('repeat').setDescription(de[3]).setMinValue(1).setMaxValue(10))
        ).addSubcommand(subcommand => subcommand
            .setName('lewd')
            .setDescription(sd[3])
            .addStringOption(option => option.setName("nsfw_l")
                .setDescription(de[1])
                .addChoice('Anal', 'anal')
                .addChoice('Blowjob', 'blowJob')
                .addChoice('Blowjob Gif', 'bj')
                .addChoice('Boobs', 'boobs')
                .addChoice('Classic', 'classic')
                .addChoice('Cumsluts', 'cumsluts')
                .addChoice('Feet', 'feet')
                .addChoice('Feet Gif', 'feetGif')
                .addChoice('Femdom', 'femdom')
                .addChoice('Futanari', 'futanari')
                .addChoice('Girl Solo', 'girlSolo')
                .addChoice('Girl Solo Gif', 'girlSoloGif')
                .addChoice('Hentai', 'hentai')
                .addChoice('Hentai Gif', 'randomHentaiGif')
                .addChoice('Lesbian', 'lesbian')
                .addChoice('Neko', 'neko')
                .addChoice('Neko Gif', 'nekoGif')
                .addChoice('Pussy', 'pussy')
                .addChoice('Pussy Wank Gif', 'pussyWankGif')
                .addChoice('Spank', 'spank')
                .addChoice('Tits', 'tits')
                .addChoice('Trap', 'trap')
                .addChoice('Yuri', 'yuri')
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription(de[3]).setMinValue(1).setMaxValue(10))
        ).addSubcommand(subcommand => subcommand
            .setName('nsfw_other')
            .setDescription(sd[4])
            .addStringOption(option => option.setName("nsfw_o")
                .setDescription(de[1])
                .addChoice('Avatar', 'avatar')
                .addChoice('Cum Arts', 'cumArts')
                .addChoice('Holo', 'holo')
                .addChoice('Kemonomimi', 'kemonomimi')
                .addChoice('Keta', 'keta')
                .addChoice('Kitsune', 'kitsune')
                .addChoice('Kuni', 'kuni')
                .addChoice('Orgasm', 'gasm')
                .addChoice('Pussy Art', 'pussyArt')
                .addChoice('Ero', 'ero')
                .addChoice('Ero Feet', 'eroFeet')
                .addChoice('Ero Holo', 'holoEro')
                .addChoice('Ero Kemonomimi', 'eroKemonomimi')
                .addChoice('Ero Kitsune', 'eroKitsune')
                .addChoice('Ero Neko', 'eroNeko')
                .addChoice('Ero Yuri', 'eroYuri')
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription(de[3]).setMinValue(1).setMaxValue(10))
        ),
	async execute(interaction, client) {
        if (interaction.options.getNumber('repeat').trim()) { var amount = Number(interaction.options.getNumber('repeat').trim()) } else var amount = 1
        for (let a = 0; a < amount; ) {
            if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT' && (interaction.options.getString('nsfw_l').trim() || interaction.options.getString('nsfw_o').trim())) {interaction.reply(lang.nsfw); return;}
            if (interaction.options.getString('nsfw_o')) { c = interaction.options.getString('nsfw_o').trim()}
            if (interaction.options.getString('nsfw_l')) { c = interaction.options.getString('nsfw_l').trim()}
            if (interaction.options.getString('sfw_w')) { c = interaction.options.getString('sfw_w').trim()}
            if (interaction.options.getString('sfw_o')) { c = interaction.options.getString('sfw_o').trim()}
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle("OwO, " + c)
                .setTimestamp()
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
            if (interaction.options.getString('sfw_w') === 'tickle') {lewd = await neko.sfw.tickle()}
            if (interaction.options.getString('sfw_w') === 'slap') {lewd = await neko.sfw.slap()}
            if (interaction.options.getString('sfw_w') === 'poke') {lewd = await neko.sfw.poke()}
            if (interaction.options.getString('sfw_w') === 'pat') {lewd = await neko.sfw.pat()}
            if (interaction.options.getString('sfw_w') === 'neko') {lewd = await neko.sfw.neko()}
            if (interaction.options.getString('sfw_w') === 'meow') {lewd = await neko.sfw.meow()}
            if (interaction.options.getString('sfw_w') === 'kiss') {lewd = await neko.sfw.kiss()}
            if (interaction.options.getString('sfw_w') === 'hug') {lewd = await neko.sfw.hug()}
            if (interaction.options.getString('sfw_w') === 'foxGirl') {lewd = await neko.sfw.foxGirl()}
            if (interaction.options.getString('sfw_w') === 'feed') {lewd = await neko.sfw.feed()}
            if (interaction.options.getString('sfw_w') === 'cuddle') {lewd = await neko.sfw.cuddle()}
            if (interaction.options.getString('sfw_w') === 'nekoGif') {lewd = await neko.sfw.nekoGif()}
            if (interaction.options.getString('sfw_w') === 'holo') {lewd = await neko.sfw.hole()}
            if (interaction.options.getString('sfw_w') === 'smug') {lewd = await neko.sfw.smug()}
            if (interaction.options.getString('sfw_w') === 'baka') {lewd = await neko.sfw.baka()}
            if (interaction.options.getString('sfw_o') === 'woof') {lewd = await neko.sfw.woof()}
            if (interaction.options.getString('sfw_o') === 'wallpaper') {lewd = await neko.sfw.wallpaper()}
            if (interaction.options.getString('sfw_o') === 'goose') {lewd = await neko.sfw.goose()}
            if (interaction.options.getString('sfw_o') === 'gecg') {lewd = await neko.sfw.gecg()}
            if (interaction.options.getString('sfw_o') === 'avatar') {lewd = await neko.sfw.avatar()}
            if (interaction.options.getString('sfw_o') === 'waifu') {lewd = await neko.sfw.waifu()}
            if (interaction.options.getString('sfw_o') === 'lizard') {lewd = await neko.sfw.lizard()}
            if (interaction.options.getString('sfw_o') === 'kemonomimi') {lewd = await neko.sfw.kemonomimi()}
            if (interaction.options.getString('sfw_o') === 'why') {lewd = await neko.sfw.why(); let text = lewd.why; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('sfw_o') === 'catText') {lewd = await neko.sfw.catText(); const text = lewd.cat; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('sfw_o') === 'OwOify') {lewd = await neko.sfw.OwOify({text: interaction.options.getString('text')}); const text = lewd.owo ; if(interaction.options.getString('text')){ embed.setDescription(text); return interaction.reply({embeds: [embed]}) } else{ return interaction.reply(er)}}
            if (interaction.options.getString('sfw_o') === 'eightBall') {lewd = await neko.sfw.eightBall({text: interaction.options.getString('text')}); const text = lewd.response ; if(interaction.options.getString('text')){ embed.setDescription("**"+interaction.options.getString('text')+"**\n"+text); return interaction.reply({embeds: [embed]}) } else{ return interaction.reply(er)}}
            if (interaction.options.getString('sfw_o') === 'fact') {lewd = await neko.sfw.fact(); const text = lewd.fact; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('sfw_o') === 'spoiler') {lewd = await neko.sfw.spoiler({text: interaction.options.getString('text')}); const text = lewd.owo ; if(interaction.options.getString('text')){ embed.setDescription(text); return interaction.reply({embeds: [embed]}) } else{ return interaction.reply(er)}}
            if (interaction.options.getString('nsfw_l') === 'randomHentaiGif') {lewd = await neko.nsfw.randomHentaiGif()}
            if (interaction.options.getString('nsfw_l') === 'pussy') {lewd = await neko.nsfw.pussy()}
            if (interaction.options.getString('nsfw_l') === 'nekoGif') {lewd = await neko.nsfw.nekoGif()}
            if (interaction.options.getString('nsfw_l') === 'neko') {lewd = await neko.nsfw.neko()}
            if (interaction.options.getString('nsfw_l') === 'lesbian') {lewd = await neko.nsfw.lesbian()}
            if (interaction.options.getString('nsfw_l') === 'cumsluts') {lewd = await neko.nsfw.cumsluts()}
            if (interaction.options.getString('nsfw_l') === 'classic') {lewd = await neko.nsfw.classic()}
            if (interaction.options.getString('nsfw_l') === 'boobs') {lewd = await neko.nsfw.boobs()}
            if (interaction.options.getString('nsfw_l') === 'bj') {lewd = await neko.nsfw.bJ()}
            if (interaction.options.getString('nsfw_l') === 'anal') {lewd = await neko.nsfw.anal()}
            if (interaction.options.getString('nsfw_l') === 'yuri') {lewd = await neko.nsfw.yuri()}
            if (interaction.options.getString('nsfw_l') === 'trap') {lewd = await neko.nsfw.trap()}
            if (interaction.options.getString('nsfw_l') === 'tits') {lewd = await neko.nsfw.tits()}
            if (interaction.options.getString('nsfw_l') === 'girlSoloGif') {lewd = await neko.nsfw.girlSoloGif()}
            if (interaction.options.getString('nsfw_l') === 'girlSolo') {lewd = await neko.nsfw.girlSolo()}
            if (interaction.options.getString('nsfw_l') === 'pussyWankGif') {lewd = await neko.nsfw.pussyWankGif()}
            if (interaction.options.getString('nsfw_l') === 'hentai') {lewd = await neko.nsfw.hentai()}
            if (interaction.options.getString('nsfw_l') === 'futanari') {lewd = await neko.nsfw.futanari()}
            if (interaction.options.getString('nsfw_l') === 'femdom') {lewd = await neko.nsfw.femdom()}
            if (interaction.options.getString('nsfw_l') === 'feetGif') {lewd = await neko.nsfw.feetGif()}
            if (interaction.options.getString('nsfw_l') === 'feet') {lewd = await neko.nsfw.feet()}
            if (interaction.options.getString('nsfw_l') === 'blowJob') {lewd = await neko.nsfw.blowJob()}
            if (interaction.options.getString('nsfw_l') === 'spank') {lewd = await neko.nsfw.spank()}
            if (interaction.options.getString('nsfw_o') === 'gasm') {lewd = await neko.nsfw.gasm()}
            if (interaction.options.getString('nsfw_o') === 'pussyArt') {lewd = await neko.nsfw.pussyArt()}
            if (interaction.options.getString('nsfw_o') === 'cumArts') {lewd = await neko.nsfw.cumArts()}
            if (interaction.options.getString('nsfw_o') === 'avatar') {lewd = await neko.nsfw.avatar()}
            if (interaction.options.getString('nsfw_o') === 'kuni') {lewd = await neko.nsfw.kuni()}
            if (interaction.options.getString('nsfw_o') === 'kemonomimi') {lewd = await neko.nsfw.kemonomimi()}
            if (interaction.options.getString('nsfw_o') === 'kitsune') {lewd = await neko.nsfw.kitsune()}
            if (interaction.options.getString('nsfw_o') === 'keta') {lewd = await neko.nsfw.keta()}
            if (interaction.options.getString('nsfw_o') === 'holo') {lewd = await neko.nsfw.holo()}
            if (interaction.options.getString('nsfw_o') === 'holoEro') {lewd = await neko.nsfw.holoEro()}
            if (interaction.options.getString('nsfw_o') === 'eroFeet') {lewd = await neko.nsfw.eroFeet()}
            if (interaction.options.getString('nsfw_o') === 'ero') {lewd = await neko.nsfw.ero()}
            if (interaction.options.getString('nsfw_o') === 'eroKitsune') {lewd = await neko.nsfw.eroKitsune()}
            if (interaction.options.getString('nsfw_o') === 'eroKemonomimi') {lewd = await neko.nsfw.eroKemonomimi()}
            if (interaction.options.getString('nsfw_o') === 'eroNeko') {lewd = await neko.nsfw.eroNeko()}
            if (interaction.options.getString('nsfw_o') === 'eroYuri') {lewd = await neko.nsfw.eroYuri()}
            embed.setImage(lewd.url)
            if (interaction.options.getUser('target')) {
                const user = interaction.options.getUser('target'), from = interaction.user
                embed.setDescription(from.toString() + de[4] + " " + interaction.options.getString('sfw_w').trim() + ", " + user.toString() + ". :3")
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