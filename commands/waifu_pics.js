const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const fetch = require('node-fetch')
const wait = require('node:timers/promises').setTimeout;
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	data: new SlashCommandBuilder()
        .setName('waifu_pics')
        .setDescription('Pictures from waifu.pics')
        .addSubcommand(subcommand => subcommand.setName('sfw').setDescription('SFW pictures')
            .addStringOption(option => option.setName('category').setDescription('SFW a category')
                .addChoice('waifu', 'waifu')
                .addChoice('neko', 'neko')
                .addChoice('shinobu', 'shinobu')
                .addChoice('megumin', 'megumin')
                .addChoice('bully', 'bully')
                .addChoice('cuddle', 'cuddle')
                .addChoice('cry', 'cry')
                .addChoice('hug', 'hug')
                .addChoice('awoo', 'awoo')
                .addChoice('kiss', 'kiss')
                .addChoice('lick', 'lick')
                .addChoice('pat', 'pat')
                .addChoice('smug', 'smug')
                .addChoice('bonk', 'bonk')
                .addChoice('yeet', 'yeet')
                .addChoice('blush', 'blush')
                .addChoice('smile', 'smile')
                .addChoice('wave', 'wave')
                .addChoice('highfive', 'highfive')
                .addChoice('handhold', 'handhold')
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription("Ping your friend if you want."))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        )
        .addSubcommand(subcommand => subcommand.setName('sfw2').setDescription('SFW pictures')
            .addStringOption(option => option.setName('category').setDescription('SFW a category')
                .addChoice('nom', 'nom')
                .addChoice('bite', 'bite')
                .addChoice('glomp', 'glomp')
                .addChoice('slap', 'slap')
                .addChoice('kill', 'kill')
                .addChoice('kick', 'kick')
                .addChoice('happy', 'happy')
                .addChoice('wink', 'wink')
                .addChoice('poke', 'poke')
                .addChoice('dance', 'dance')
                .addChoice('cringe', 'cringe')
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription("Ping your friend if you want."))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        )
        .addSubcommand(subcommand => subcommand.setName('nsfw').setDescription('NSFW pictures')
            .addStringOption(option => option.setName('category').setDescription('NSFW category')
                .addChoice('waifu', 'waifu')
                .addChoice('neko', 'neko')
                .addChoice('trap', 'trap')
                .addChoice('blowjob', 'blowjob')
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        ),
    async execute(interaction, client, config) {
        try {
            interaction.options.getSubcommand() === 'sfw2' ? type = 'sfw' : type = interaction.options.getSubcommand();
            const category = interaction.options.getString('category');
            const enableNSFW = client.settings.get(interaction.guild.id, "enableNSFW");
            if (type=="sfw") { }
            else { if(enableNSFW) { if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { return interaction.reply(lang.nsfw)} } else {return interaction.reply(lang.nsfwdisable)}  }
            if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
            await interaction.reply("Waifu.pics []~(￣▽￣)~*")
            for (let a = 0; a < amount; a++ ) {
                let response = await fetch(`https://api.waifu.pics/${type}/${category}`);
                let data = await response.text();
                const img = JSON.parse(data)
                const embed = new MessageEmbed()
                    .setImage(img.url)
                    .setFooter({text: `${category} - ${a+1}/${amount}`})
                if (interaction.options.getUser('target')) {
                    const user = interaction.options.getUser('target'), from = interaction.user
                    embed.setDescription(from.toString() + " sends you a nice " + category + ", " + user.toString() + ". :3")
                    await interaction.followUp({ content: user.toString(), embeds: [embed]})
                } else {
                    await interaction.followUp({ embeds: [embed]})
                }
                await wait(1000);
            }
        }catch(error) {
            console.log(error)
        }
    }
}