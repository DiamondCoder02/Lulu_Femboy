const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Message } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nhentai')
		.setDescription('nHentai reading for you.')
        .addStringOption(option =>
            option.setName('get')
            .setDescription('Choose one you want to see:')
            .addChoice('Random', 'random')
            .addChoice('New', 'new')
            .addChoice('Popular', 'popular')
        )
        .addStringOption(option => option.setName('name').setDescription('Search for name:'))
        .addStringOption(option => option.setName('author').setDescription('Search for author'))
        .addIntegerOption(option => option.setName('id').setDescription('Search for ID'))
        .addIntegerOption(option => option.setName('to_read_id').setDescription('To read a manga by ID')),
	async execute(interaction, client) {
        if (!interaction.channel.nsfw) {
            interaction.reply('Sorry, this is a Not Safe For Work command!'); return;
        }
        const pageNumber = 0
        const maxNumber = 100
        const nHentai = require('shentai')
        const sHentai = new nHentai
        const page = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('left')
                    .setLabel('Left')
                    .setStyle('SECONDARY')
                    .setEmoji('⬅️')
                    .setDisabled(((pageNumber===0)? true : false)),
                new MessageButton()
                    .setCustomId('right')
                    .setLabel('Right')
                    .setStyle('PRIMARY')
                    .setEmoji('➡️')
                    .setDisabled(((pageNumber===maxNumber)? false : true)),
                new MessageButton()
                    .setCustomId('delete')
                    .setLabel('Delete message')
                    .setStyle('DANGER')
                    .setEmoji('✖️')
            )
        function searchEmbed(doujin){
            const nhentaiEmbed = new MessageEmbed()
            .setColor('#ec2852')
            .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
            .setTimestamp()
            .setTitle(String(doujin.titles.english))
            .setDescription(String(doujin.titles.original))
            .addField("tags:", String(doujin.tags))
            .setImage(doujin.cover)
            .setFooter({ text: "ID: "+String(doujin.id) })
            interaction.reply({content: "nHentai testing", embeds: [nhentaiEmbed]})
        }
        function readEmbed(doujin){
            const readEm = new MessageEmbed()
            .setColor('#ec2852')
            .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
            .setTimestamp()
            .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
            .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
            .setImage(doujin.pages[pageNumber])
            .setFooter({ text: "ID: "+String(doujin.id) })
            interaction.reply({content: "nHentai testing", embeds: [readEm], components: [page]})
            console.log(doujin.pages[pageNumber])
        }
        const filter = i => {i.deferUpdate();return i.user.id === interaction.user.id;};
        const collector = interaction.channel.createMessageComponentCollector({filter, time: 60000 });
        collector.on('collect', async i => {
            if (i.customId === 'delete') {
                await interaction.deleteReply();
                collector.stop()
            }if (i.customId === 'right') {
                pageNumber += 1
                const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('to_read_id')))
                const readEmbed = new MessageEmbed()
                    .setColor('#ec2852')
                    .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
                    .setTimestamp()
                    .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
                    .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
                    .setImage(String(doujin.pages[pageNumber]))
                    .setFooter({ text: "ID: "+String(doujin.id) })
                interaction.editReply({embeds: [readEmbed], components: [page]})
                console.log(pageNumber)
            }if (i.customId === 'left') {
                pageNumber -= 1
                const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('to_read_id')))
                const readEmbed = new MessageEmbed()
                    .setColor('#ec2852')
                    .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
                    .setTimestamp()
                    .setTitle(String((doujin.titles.english? doujin.titles.english : "-")))
                    .setDescription(String((doujin.titles.original? doujin.titles.original : "-")))
                    .setImage(String(doujin.pages[pageNumber]))
                    .setFooter({ text: "ID: "+String(doujin.id) })
                interaction.editReply({embeds: [readEmbed], components: [page]})
                console.log(pageNumber)
            }
        });
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        //check arg
        if (interaction.options.getString('get') === 'random') {
            // Random, in async function (id, author.empty, both titles, pages, tags, cover)
            const doujin = await sHentai.getRandom()
            searchEmbed(doujin)
            console.log(doujin)
        }else if (interaction.options.getString('get') === 'new') {
            // New, in async function (id, english titles, cover [About 25 pages])
            const doujins2 = await sHentai.getNew()
            console.log(doujins2)
        }else if (interaction.options.getString('get') === 'popular') {
            // Popular, in async function  (id, english titles, cover [About 5 pages])
            const doujins = await sHentai.getPopular()
            console.log(doujins)
        }else if (interaction.options.getString('name')) {
            // Search name in async function (id, author.empty, both titles, pages, tags, cover)
            const search2 = await sHentai.search(interaction.options.getString('name'))
            const doujin3 = await sHentai.getDoujin(search2.results[0].id)
            searchEmbed(doujin3)
            console.log(doujin3)
        }else if (interaction.options.getString('author')) {
            // Search author in async function (id, object titles, cover [About 10 pages])
            const doujins3 = await sHentai.byAuthor(interaction.options.getString('author'))
            console.log(doujins3)
        }else if (interaction.options.getInteger('id')) {
            // Search number, in async function (id, author.empty, both titles, pages, tags, cover)
            const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('id')))
            searchEmbed(doujin)
            console.log(doujin)
        }else if (interaction.options.getInteger('to_read_id')) {
            // Search number, in async function (id, author.empty, both titles, pages, tags, cover)
            const doujin = await sHentai.getDoujin(String(interaction.options.getInteger('to_read_id')))
            readEmbed(doujin)
            console.log(doujin)
        }
        //await interaction.reply({content: "nHentai testing", embeds: [searchEmbed], components: [page]})
        /*    
        // Next Page (id, english titles, cover [About 25 pages]) ???????????????
        const search = await sHentai.search('dev')
        const nextPage = await search.next()
        console.log(nextPage.results)
        */
    }
}