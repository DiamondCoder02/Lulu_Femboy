const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const nHentai = require('shentai'), sHentai = new nHentai
module.exports = {
    guildOnly: true,
    cooldown: 15,
	data: new SlashCommandBuilder()
		.setName('nhentai')
		.setDescription('nHentai reading for you.')
        .addStringOption(option => option.setName('get').setDescription('Choose one you want to see:')
            .addChoice('Random', 'random')
            .addChoice('Top 25 New', 'new')
            .addChoice('Top 5 Popular', 'popular')
        )
        .addStringOption(option => option.setName('name').setDescription('Search for name.'))
        //.addStringOption(option => option.setName('author').setDescription('Search for author.'))
        .addIntegerOption(option => option.setName('id').setDescription('Search for ID.'))
        .addIntegerOption(option => option.setName('to_read_id').setDescription('To read a manga by ID.')),
	async execute(interaction, client, config) {
        const enableNSFW = client.settings.get(interaction.guild.id, "enableNSFW");
        if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') {if(!enableNSFW) {return interaction.reply(lang.nsfw)}}
        try {collector.stop()} catch{console.log("No collect")}
        var pageNumber = -1
        const page = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId('left').setLabel('Left').setStyle('SECONDARY').setEmoji('⬅️').setDisabled(false),
                new MessageButton().setCustomId('right').setLabel('Right').setStyle('PRIMARY').setEmoji('➡️').setDisabled(false)
            )
        const searchDelete = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('delete').setLabel('Delete message').setStyle('DANGER').setEmoji('✖️'))
        function searchEmbed(doujin){
            const nhentaiEmbed = new MessageEmbed()
            .setColor('#ec2852')
            .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
            .setTimestamp()
            .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
            .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
            .addField("tags:", String(doujin.tags))
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
                const readEmbed = new MessageEmbed()
                    .setColor('#ec2852')
                    .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
                    .setTimestamp()
                    .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
                    .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
                    .setImage(String(doujin.pages[pageNumber]))
                    .setFooter({ text: "ID: "+String(doujin.id)+" -Pages: "+(pageNumber+1)+"/"+doujin.pages.length })
                interaction.editReply({embeds: [readEmbed], components: [page, searchDelete]})
            }if (i.customId === 'left') {
                const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('to_read_id')))
                if (pageNumber <= 0) {pageNumber = 0} else {pageNumber -=1}
                console.log(pageNumber +" / "+ doujin.pages.length)
                const readEmbed = new MessageEmbed()
                    .setColor('#ec2852')
                    .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
                    .setTimestamp()
                    .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
                    .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
                    .setImage(String(doujin.pages[pageNumber]))
                    .setFooter({ text: "ID: "+String(doujin.id)+" -Pages: "+(pageNumber+1)+"/"+doujin.pages.length })
                interaction.editReply({embeds: [readEmbed], components: [page, searchDelete]})
            }
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
             * @returns {Promise<MessageEmbed>}
             */
            const generateEmbed = async start => {
                const current = doujins.slice(start, start + 25)
                return new MessageEmbed({
                    title: `Showing new doujins:`,
                    author: {name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/'},
                    color: '#ec2852',
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
             * @returns {Promise<MessageEmbed>}
             */
            const generateEmbed = async start => {
                const current = doujins.slice(start, start + 5)
                return new MessageEmbed({
                    title: `Showing popular doujins:`,
                    author: {name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/'},
                    color: '#ec2852',
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
             * @returns {Promise<MessageEmbed>}
             */
            const generateEmbed = async start => {
                const current = doujins.slice(start, start + 10)
                return new MessageEmbed({
                    title: `Showing author doujins:`,
                    author: {name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/'},
                    color: '#ec2852',
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
            const readEm = new MessageEmbed()
            .setColor('#ec2852')
            .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
            .setTimestamp()
            .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
            .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
            .setImage(doujin.cover)
            .setFooter({ text: "ID: "+String(doujin.id)+" -Pages: "+(pageNumber+1)+"/"+(doujin.pages).length })
            interaction.reply({embeds: [readEm], components: [page, searchDelete]})
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