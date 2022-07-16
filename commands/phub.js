const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), s = lang.phub.slash.split('-') , r = lang.phub.reply.split('-')
const { RandomPHUB } = require('discord-phub'), nsfw = new RandomPHUB(unique = true);
module.exports = {
	cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('phub')
        .setDescription(s[0])
        .addStringOption(option => option.setName('category').setDescription(s[1]))
        .addStringOption(option => option.setName('type').setDescription(s[2])
            .addChoice('jpeg', 'jpeg')
            .addChoice('jpg', 'jpg')
            .addChoice('png', 'png')
            .addChoice('gif', 'gif')
            .addChoice('mp4', 'mp4')
        )
        .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10)),
    async execute(interaction, client) {
        const enableNSFW = client.settings.get(interaction.guild.id, "enableNSFW");
        if(enableNSFW) { if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { return interaction.reply(lang.nsfw)} } else {return interaction.reply(lang.nsfwdisable)}
        if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
        if (interaction.options.getString('category')) { var c = interaction.options.getString('category') } else var c = null
        if (interaction.options.getString('type')) { var t = interaction.options.getString('type') } else var t = null
        await interaction.reply("Searching"+"...")
        try{
            for (var i = 0; i < amount; i++) {
                if (!c && !t) { random = nsfw.getRandom() }
                else if (!c && t) { random = nsfw.getRandom(t) }
                else if (c && !t) { random = nsfw.getRandomInCategory(c) }
                else if (c && t) { if (nsfw.verifyTypeInCategory(t, c)) {random = nsfw.getRandomInCategory(c, t) } else { return interaction.editReply({content: r[4]}) } }
                //console.log(random)
                const embed = new MessageEmbed()
                    .setTitle("🌐 "+r[0])
                    .setColor('#A020F0 ')
                    .addField("📁 "+r[2], random.category, true)
                    .addField("📄 "+r[3], random.type, true)
                    .setFooter({ text: (i+1)+" / "+amount})
                    .setTimestamp()
                const buttons = new MessageActionRow().addComponents( new MessageButton().setURL(random.url).setLabel('Link').setStyle('LINK').setEmoji('🖥️'))
                if (random.url.includes(".mp4")) {
                    await interaction.followUp({embeds: [embed], components: [buttons]})
                    await interaction.followUp({content: random.url});
                } else {
                    embed.setImage(random.url)
                    await interaction.followUp({embeds: [embed], components: [buttons]})
                }
                await wait(2000);
            }
        } catch {
            const type = nsfw.type.join(', ')
            const categ1 = nsfw.categories.slice(0, 21).join('\n'), categ2 = nsfw.categories.slice(22, 43).join('\n'), categ3 = nsfw.categories.slice(44, 65).join('\n')
            const embed = new MessageEmbed()
                .setTitle(r[1])
                .setColor('#A020F0 ')
                .addField("📄 "+r[3], " "+type)
                .addField("📁 "+r[2]+"1", " "+categ1, true)
                .addField("📁 "+r[2]+"2", " "+categ2, true)
                .addField("📁 "+r[2]+"3", " "+categ3, true)
                .setTimestamp()
            return await interaction.editReply({embeds: [embed]})
        }
    }
};