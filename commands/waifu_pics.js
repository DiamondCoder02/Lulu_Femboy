const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ChannelType } = require('discord.js');
const fetch = require('node-fetch')
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
        .setName('waifu_pics')
        .setDescription('Pictures from waifu.pics')
        .addSubcommand(subcommand => subcommand.setName('sfw').setDescription('SFW pictures')
            .addStringOption(option => option.setName('category').setDescription('SFW a category')
                .addChoices(
                    { name: 'waifu', value: 'waifu' },
                    { name: 'neko', value: 'neko' },
                    { name: 'shinobu', value: 'shinobu' },
                    { name: 'megumin', value: 'megumin' },
                    { name: 'bully', value: 'bully' },
                    { name: 'cuddle', value: 'cuddle' },
                    { name: 'cry', value: 'cry' },
                    { name: 'hug', value: 'hug' },
                    { name: 'awoo', value: 'awoo' },
                    { name: 'kiss', value: 'kiss' },
                    { name: 'lick', value: 'lick' },
                    { name: 'pat', value: 'pat' },
                    { name: 'smug', value: 'smug' },
                    { name: 'bonk', value: 'bonk' },
                    { name: 'yeet', value: 'yeet' },
                    { name: 'blush', value: 'blush' },
                    { name: 'smile', value: 'smile' },
                    { name: 'wave', value: 'wave' },
                    { name: 'highfive', value: 'highfive' },
                    { name: 'handhold', value: 'handhold' }
                )
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription("Ping your friend if you want."))
            .addNumberOption(option => option.setName('repeat').setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
        )
        .addSubcommand(subcommand => subcommand.setName('sfw2').setDescription('SFW pictures')
            .addStringOption(option => option.setName('category').setDescription('SFW a category')
                .addChoices(
                    { name: 'nom', value: 'nom' },
                    { name: 'bite', value: 'bite' },
                    { name: 'glomp', value: 'glomp' },
                    { name: 'slap', value: 'slap' },
                    { name: 'kill', value: 'kill' },
                    { name: 'kick', value: 'kick' },
                    { name: 'happy', value: 'happy' },
                    { name: 'wink', value: 'wink' },
                    { name: 'poke', value: 'poke' },
                    { name: 'dance', value: 'dance' },
                    { name: 'cringe', value: 'cringe' }
                )
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription("Ping your friend if you want."))
            .addNumberOption(option => option.setName('repeat').setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
        )
        .addSubcommand(subcommand => subcommand.setName('nsfw').setDescription('NSFW pictures')
            .addStringOption(option => option.setName('category').setDescription('NSFW category')
                .addChoices(
                    { name: 'waifu', value: 'waifu' },
                    { name: 'neko', value: 'neko' },
                    { name: 'trap', value: 'trap' },
                    { name: 'blowjob', value: 'blowjob' }
                )
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
        ),
    async execute(interaction, client, config) {
        try {
            interaction.options.getSubcommand() === 'sfw2' ? type = 'sfw' : type = interaction.options.getSubcommand();
            const category = interaction.options.getString('category');
            if (type=="sfw") { }
            else { if(client.settings.get(interaction.guild.id, "enableNSFW")) { if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply("Sorry, this is a Not Safe For Work command!")} } else {return interaction.reply("Not Safe For Work commands are disabled!")}  }
            if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
            for (let a = 0; a < amount; a++ ) {
                let response = await fetch(`https://api.waifu.pics/${type}/${category}`);
                let data = await response.text();
                const img = JSON.parse(data)
                const embed = new EmbedBuilder()
                    .setImage(img.url)
                    .setFooter({text: `${category} - ${a+1}/${amount}`})
                    .setColor('#A020F0 ')
                if (interaction.options.getUser('target')) {
                    const user = interaction.options.getUser('target'), from = interaction.user
                    embed.setDescription(from.toString() + " sends you a nice " + category + ", " + user.toString() + ". :3")
                    try { await interaction.followUp({ content: user.toString(), embeds: [embed]}) }
                    catch { interaction.reply({ content: user.toString(), embeds: [embed]}) }
                } else {
                    try { await interaction.followUp({ embeds: [embed]}) }
                    catch { interaction.reply({ embeds: [embed]}) }
                }
                await wait(1000);
            }
        }catch(error) {
            console.log(error)
        }
    }
}