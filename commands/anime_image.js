const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder, ChannelType } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
const wait = require('node:timers/promises').setTimeout;
const API = require('anime-images-api')
const images = new API() 
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('anime_image')
		.setDescription('Pictures from anime-images')
        .addSubcommand(subcommand => subcommand
            .setName('sfw')
            .setDescription("Get a random SFW image")
            .addStringOption(option => option.setName("category")
                .setDescription("Choose from a list of categories")
                .addChoices(
                    { name: "hug", value: "hug" },
                    { name: "kiss", value: "kiss" },
                    { name: "slap", value: "slap" },
                    { name: "punch", value: "punch" },
                    { name: "wink", value: "wink" },
                    { name: "pat", value: "pat" },
                    { name: "kill", value: "kill" },
                    { name: "cuddle", value: "cuddle" },
                    { name: "waifu", value: "waifu" },
                )
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription('Select a user'))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        ).addSubcommand(subcommand => subcommand
            .setName('nsfw')
            .setDescription("Get a random NSFW image")
            .addStringOption(option => option.setName("category")
                .setDescription("Choose from a list of categories")
                .addChoices(
                    { name: "hentai", value: "hentai" },
                    { name: "boobs", value: "boobs" },
                    { name: "lesbian", value: "lesbian" },
                )
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        ),
	async execute(interaction, client) {
        try {
            const category = interaction.options.getString('category');
            if (interaction.options.getSubcommand() == "sfw") { }
            else { if(client.settings.get(interaction.guild.id, "enableNSFW")) { if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply(lang.nsfw)} } else {return interaction.reply(lang.nsfwdisable)}  }
            if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
            for (let a = 0; a < amount; a++ ) {
                if (category === 'hug') {img = await images.sfw.hug()}
                if (category === 'kiss') {img = await images.sfw.kiss()}
                if (category === 'slap') {img = await images.sfw.slap()}
                if (category === 'punch') {img = await images.sfw.punch()}
                if (category === 'wink') {img = await images.sfw.wink()}
                if (category === 'pat') {img = await images.sfw.pat()}
                if (category === 'kill') {img = await images.sfw.kill()}
                if (category === 'cuddle') {img = await images.sfw.cuddle()}
                if (category === 'waifu') {img = await images.sfw.waifu()}
                if (category === 'hentai') {img = await images.nsfw.hentai()}
                if (category === 'boobs') {img = await images.nsfw.boobs()}
                if (category === 'lesbian') {img = await images.nsfw.lesbian()}
                //console.log(img)
                const embed = new EmbedBuilder()
                    .setImage(img.image)
                    .setFooter({text: `${category} - ${a+1}/${amount}`})
                    .setColor('#00FF00')
                if (interaction.options.getUser('target')) {
                    const user = interaction.options.getUser('target'), from = interaction.user
                    embed.setDescription(from.toString() + " sends you a nice " + category + ", " + user.toString() + ". :3")
                    try { await interaction.followUp({ content: user.toString(), embeds: [embed]}) }
                    catch { await interaction.reply({ content: user.toString(), embeds: [embed]}) } 
                } else {
                    try { await interaction.followUp({ embeds: [embed]}) }
                    catch { await interaction.reply({ embeds: [embed]}) } 
                }
                await wait(1000);
            }
        }catch(error) {
            console.log(error)
        }
    }
};