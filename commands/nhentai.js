const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
const nHentai = require('shentai'), sHentai = new nHentai
module.exports = {
    guildOnly: true,
    cooldown: 15,
	data: new SlashCommandBuilder()
		.setName('nhentai')
		.setDescription('nHentai reading for you.')
        .addStringOption(option => option.setName('get').setDescription('Choose one you want to see:')
            .addChoices(
                { name: "Random", value: 'random' },
                { name: "Top 25 New", value: 'new' },
                { name: "Top 5 Popular", value: 'popular' }
            )
        )
        .addStringOption(option => option.setName('name').setDescription('Search for name.'))
        //.addStringOption(option => option.setName('author').setDescription('Search for author.'))
        .addIntegerOption(option => option.setName('id').setDescription('Search for ID.'))
        .addIntegerOption(option => option.setName('to_read_id').setDescription('To read a manga by ID.')),
	async execute(interaction, client, config) {
        if(client.settings.get(interaction.guild.id, "enableNSFW")) { if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply(lang.nsfw)} } else {return interaction.reply(lang.nsfwdisable)}
        try {collector.stop()} catch{console.log("No collect")}
        var pageNumber = -1
        const page = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('left').setLabel('Left').setStyle(ButtonStyle.Secondary).setEmoji('⬅️').setDisabled(false),
                new ButtonBuilder().setCustomId('right').setLabel('Right').setStyle(ButtonStyle.Primary).setEmoji('➡️').setDisabled(false)
            )
        const searchDelete = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('delete').setLabel('Delete message').setStyle(ButtonStyle.Danger).setEmoji('✖️'))
        function searchEmbed(doujin){
            console.log(doujin)
            const nhentaiEmbed = new EmbedBuilder()
            .setColor('#A020F0')
            .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
            .setTimestamp()
            .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
            .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
            .addFields( { name: "tags:", value: String(doujin.tags) } )
            .setImage(doujin.cover)
            .setFooter({ text: "ID: "+String(doujin.id) })
            interaction.reply({embeds: [nhentaiEmbed], components: [searchDelete]})
        }
        if (interaction.options.getInteger('to_read_id')) {
            // Search number, in async function (id, author.empty, both titles, pages, tags, cover)
            pageTime = await sHentai.getDoujin(String(interaction.options.getInteger('to_read_id')))
        }else pageTime = {"pages":["1"]}
        const filter = i => {i.deferUpdate();return i.user.id === interaction.user.id;};
        const collector = interaction.channel.createMessageComponentCollector({filter, time: ((pageTime.pages).length)*30000 });
        collector.on('collect', async i => {
            if (i.customId === 'delete') { await interaction.deleteReply(); collector.stop() }
            if (i.customId === 'right') {
                const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('to_read_id')))
                if ((pageNumber+1) === doujin.pages.length) {pageNumber = ((doujin.pages.length)-1)} else {pageNumber +=1}
                console.log(pageNumber +" / "+ (doujin.pages.length))
                const readEmbed = new EmbedBuilder()
                    .setColor('#A020F0')
                    .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
                    .setTimestamp()
                    .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
                    .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
                    .setImage(String(doujin.pages[pageNumber]))
                    .setFooter({ text: "ID: "+String(doujin.id)+" -Pages: "+(pageNumber+1)+"/"+doujin.pages.length })
                await i.update({components: interaction.components})
                await interaction.editReply({embeds: [readEmbed], components: [page, searchDelete]})
            }if (i.customId === 'left') {
                const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('to_read_id')))
                if (pageNumber <= 0) {pageNumber = 0} else {pageNumber -=1}
                console.log(pageNumber +" / "+ doujin.pages.length)
                const readEmbed = new EmbedBuilder()
                    .setColor('#A020F0')
                    .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
                    .setTimestamp()
                    .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
                    .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
                    .setImage(String(doujin.pages[pageNumber]))
                    .setFooter({ text: "ID: "+String(doujin.id)+" -Pages: "+(pageNumber+1)+"/"+doujin.pages.length })
                await i.update({components: interaction.components})
                await interaction.editReply({embeds: [readEmbed], components: [page, searchDelete]})
            }
            //i.update({components: interaction.components})
        });
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        //check arg
        if (interaction.options.getString('get') === 'random') {
            // Random, in async function (id, author.empty, both titles, pages, tags, cover)
            const doujin = await sHentai.getRandom()
            searchEmbed(doujin)
        }else if (interaction.options.getString('get') === 'new') {
            // New, in async function (id, english titles, cover [About 25 pages])
            const doujins = await sHentai.getNew()
            /**
             * @param {number} start
             * @returns {Promise<EmbedBuilder>}
             */
            const generateEmbed = async start => {
                const current = doujins.slice(start, start + 25)
                return new EmbedBuilder({
                    title: `Showing new doujins:`,
                    author: {name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/'},
                    color: '#A020F0',
                    fields: await Promise.all(
                        current.map(async doujins => ({
                            name: `*ID:*  -  ${doujins.id}`, value: `**Title:**  ${doujins.titles.english}`
                        }))
                    )
                })
            }
            interaction.reply({embeds: [await generateEmbed(0)], components: [searchDelete]})
        }else if (interaction.options.getString('get') === 'popular') {
            // Popular, in async function  (id, english titles, cover [About 5 pages])
            const doujins = await sHentai.getPopular()
            /**
             * @param {number} start
             * @returns {Promise<EmbedBuilder>}
             */
            const generateEmbed = async start => {
                const current = doujins.slice(start, start + 5)
                return new EmbedBuilder({
                    title: `Showing popular doujins:`,
                    author: {name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/'},
                    color: '#A020F0',
                    fields: await Promise.all(
                        current.map(async doujins => ({
                            name: `*ID:*  -  ${doujins.id}`, value: `**Title:**  ${doujins.titles.english}`
                        }))
                    )
                })
            }
            interaction.reply({embeds: [await generateEmbed(0)], components: [searchDelete]})
        }else if (interaction.options.getString('name')) {
            // Search name in async function (id, author.empty, both titles, pages, tags, cover)
            const search2 = await sHentai.search(interaction.options.getString('name'))
            const doujin = await sHentai.getDoujin(search2.results[0].id)
            searchEmbed(doujin)
        }else if (interaction.options.getString('author')) {
            // Search author in async function (id, object titles, cover [About 10 pages])
            const doujins = await sHentai.byAuthor(interaction.options.getString('author'))
            /**
             * @param {number} start
             * @returns {Promise<EmbedBuilder>}
             */
            const generateEmbed = async start => {
                const current = doujins.slice(start, start + 10)
                return new EmbedBuilder({
                    title: `Showing author doujins:`,
                    author: {name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/'},
                    color: '#A020F0',
                    fields: await Promise.all(
                        current.map(async doujins => ({
                            name: `*ID:*  -  ${doujins.id}`, value: `**Title:**  ${doujins.titles.english}`
                        }))
                    )
                })
            }
            interaction.reply({embeds: [await generateEmbed(0)], components: [searchDelete]})
        }else if (interaction.options.getInteger('id')) {
            // Search number, in async function (id, author.empty, both titles, pages, tags, cover)
            const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('id')))
            searchEmbed(doujin)
        }else if (interaction.options.getInteger('to_read_id')) {
            // Search number, in async function (id, author.empty, both titles, pages, tags, cover)
            const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('to_read_id')))
            const readEm = new EmbedBuilder()
            .setColor('#A020F0')
            .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
            .setTimestamp()
            .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
            .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
            .setImage(doujin.cover)
            .setFooter({ text: "ID: "+String(doujin.id)+" -Pages: "+(pageNumber+1)+"/"+(doujin.pages).length })
            interaction.reply({embeds: [readEm], components: [page, searchDelete]})
        } else {
            return interaction.reply({content: 'Instruction not found'})
        }
        /*    
        // Next Page (id, english titles, cover [About 25 pages]) ???????????????
        const search = await sHentai.search('dev')
        const nextPage = await search.next()
        console.log(nextPage.results)
        console.log(search)
        */
    }
}