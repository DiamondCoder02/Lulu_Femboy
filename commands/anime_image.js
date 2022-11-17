const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder, ChannelType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const API = require('anime-images-api')
const images = new API() 
module.exports = {
    hasNSFW: true,
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
            .addNumberOption(option => option.setName('repeat').setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
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
            .addNumberOption(option => option.setName('repeat').setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
        ),
	async execute(interaction, client) {
        try {
            const category = interaction.options.getString('category');
            if (interaction.options.getSubcommand() == "sfw") { }
            else { if(client.settings.get(interaction.guild.id, "enableNSFW")) { if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply("Sorry, this is a Not Safe For Work command!")} } else {return interaction.reply("Not Safe For Work commands are disabled!")}  }
            if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
            for (let a = 0; a < amount; a++ ) {
                switch (category) {
                    case "hug": {img = await images.sfw.hug()} break;
                    case "kiss": {img = await images.sfw.kiss()} break;
                    case "slap": {img = await images.sfw.slap()} break;
                    case "punch": {img = await images.sfw.punch()} break;
                    case "wink": {img = await images.sfw.wink()} break;
                    case "pat": {img = await images.sfw.pat()} break;
                    case "kill": {img = await images.sfw.kill()} break;
                    case "cuddle": {img = await images.sfw.cuddle()} break;
                    case "waifu": {img = await images.sfw.waifu()} break;
                    case "hentai": {img = await images.nsfw.hentai()} break;
                    case "boobs": {img = await images.nsfw.boobs()} break;
                    case "lesbian": {img = await images.nsfw.lesbian()} break;
                }
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