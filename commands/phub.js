const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const { RandomPHUB } = require('discord-phub'), nsfw = new RandomPHUB(unique = true);
module.exports = {
	cooldown: 10,
    hasNSFW: true,
    data: new SlashCommandBuilder()
        .setName('phub')
        .setDescription("Discord 18+ database with more than 5000 elements")
        .addStringOption(option => option.setName('category').setDescription("66 categories you might be interested. Write only ONE"))
        .addStringOption(option => option.setName('type').setDescription("If you want specific file format (.gif, .jpg, .mp4,...)")
            .addChoices(
                { name: 'jpeg', value: 'jpeg' },
                { name: 'jpg', value: 'jpg' },
                { name: 'png', value: 'png' },
                { name: 'gif', value: 'gif' },
                { name: 'mp4', value: 'mp4' },
            )
        )
        .addNumberOption(option => option.setName('repeat').setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10)),
    async execute(interaction, client) {
        if (client.settings.get(interaction.guild.id, "enableNSFW")) { if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply("Sorry, this is a Not Safe For Work command!")} } else {return interaction.reply("Not Safe For Work commands are disabled!")}
        if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
        if (interaction.options.getString('category')) { var c = interaction.options.getString('category') } else var c = null
        if (interaction.options.getString('type')) { var t = interaction.options.getString('type') } else var t = null
        try{
            for (var i = 0; i < amount; i++) {
                if (!c && !t) { random = nsfw.getRandom() }
                else if (!c && t) { random = nsfw.getRandom(t) }
                else if (c && !t) { random = nsfw.getRandomInCategory(c) }
                else if (c && t) { if (nsfw.verifyTypeInCategory(t, c)) {random = nsfw.getRandomInCategory(c, t) } else { return interaction.editReply({content: "You cannot have that combination. Sorry!"}) } }
                //console.log(random)
                const embed = new EmbedBuilder()
                    .setTitle("🌐 Random from Discord phub")
                    .setColor('#A020F0 ')
                    .addFields(
                        { name: "📁 Category", value: random.category, inline: true },
                        { name: "📄 Type", value: random.type, inline: true },
                    )
                    .setFooter({ text: (i+1)+" / "+amount})
                    .setTimestamp()
                const buttons = new ActionRowBuilder().addComponents( new ButtonBuilder().setURL(random.url).setLabel('Link').setStyle(ButtonStyle.Link).setEmoji('🖥️'))
                if (random.url.includes(".mp4")) {
                    try{ await interaction.followUp({embeds: [embed], components: [buttons]}) } 
                    catch { await interaction.reply({embeds: [embed], components: [buttons]}) }
                    await interaction.followUp({content: random.url});
                } else {
                    embed.setImage(random.url)
                    try{ await interaction.followUp({embeds: [embed], components: [buttons]}) }
                    catch { await interaction.reply({embeds: [embed], components: [buttons]}) }
                }
                await wait(2000);
            }
        } catch {
            const type = nsfw.type.join(', ')
            const categ1 = nsfw.categories.slice(0, 21).join('\n'), categ2 = nsfw.categories.slice(22, 43).join('\n'), categ3 = nsfw.categories.slice(44, 65).join('\n')
            const embed = new EmbedBuilder()
                .setTitle("These are the available catogories and types")
                .setColor('#A020F0 ')
                .addFields(
                    { name: "📄 Category", value: " "+type },
                    { name: "📁 Type 1", value: " "+categ1, inline: true },
                    { name: "📁 Type 2", value: " "+categ2, inline: true },
                    { name: "📁 Type 3", value: " "+categ3, inline: true },
                )
                .setTimestamp()
            return await interaction.reply({embeds: [embed]})
        }
    }
};