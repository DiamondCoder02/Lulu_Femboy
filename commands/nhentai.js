const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
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
        .addStringOption(option =>
            option.setName('name')
            .setDescription('Search for name:')
        )
        .addStringOption(option =>
            option.setName('author')
            .setDescription('Search for author')
        )
        .addIntegerOption(option =>
            option.setName('id')
            .setDescription('Search for ID')
        ),
	async execute(interaction, client) {
        try{
            const nHentai = require('shentai')
            const sHentai = new nHentai
            const cover_search = new MessageEmbed()
                .setColor('#ec2852')
                .setTitle('nHentai search')
                .setAuthor({ name: 'nHentai', iconURL: 'https://emblemsbf.com/img/min/94079.webp', url: 'https://nhentai.net/' })
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096' })
            const page = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('left')
                        .setLabel('Left')
                        .setStyle('SECONDARY')
                        .setEmoji('⬅️')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('right')
                        .setLabel('Right')
                        .setStyle('PRIMARY')
                        .setEmoji('➡️')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('delete')
                        .setLabel('Delete message')
                        .setStyle('DANGER')
                        .setEmoji('✖️')
                )
            const filter = i => i.customId === 'delete';
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
            collector.on('collect', async i => {
                if (i.customId === 'delete') {
                    await interaction.deleteReply();
                }
            });
            collector.on('end', collected => console.log(`Collected ${collected.size} items`));

            if (interaction.options.getString('get') === 'random') {
                // Random, in async function (id, author.empty, both titles, pages, tags, cover)
                const doujin = await sHentai.getRandom()
                console.log(doujin)
            }else if (interaction.options.getString('get') === 'new') {
                // New, in async function (id, english titles, cover [About 25 pages])
                const doujins2 = await sHentai.getNew()
                console.log(doujins2)
            }else if (interaction.options.getString('get') === 'popular') {
                // Popular, in async function  (id, english titles, cover [About 5 pages])
                const doujins = await sHentai.getPopular()
                console.log(doujins)
            }else if (!interaction.options.getString('name')) {
                // Search name in async function (id, author.empty, both titles, pages, tags, cover)
                const search2 = await sHentai.search('dev')
                const doujin3 = await sHentai.getDoujin(search2.results[0].id)
                console.log(doujin3)
            }else if (!interaction.options.getString('author')) {
                // Search author in async function (id, object titles, cover [About 10 pages])
                const doujins3 = await sHentai.byAuthor('oden')
                console.log(doujins3)
            }else if (!interaction.options.getString('id')) {
                // Search number, in async function (id, author.empty, both titles, pages, tags, cover)
                const doujin = await sHentai.getDoujin('395038')
                console.log(doujin)
            }
            
            await interaction.reply({content: "nHentai testing", embeds: [cover_search], components: [page]})
        }catch(error){
            console.log(error)
        }
        /*    
// Search number, in async function (id, author.empty, both titles, pages, tags, cover)
const doujin = await sHentai.getDoujin('395038')
console.log(doujin)
console.log('\n\nUwU8\n\n')

// Search author in async function (id, object titles, cover [About 10 pages])
const doujins3 = await sHentai.byAuthor('oden')
console.log(doujins3)
console.log('\n\nUwU0\n\n')

// Searching  (id, english titles, cover [About 25 pages])
await sHentai.search('dev').then(search => console.log(search.results))
console.log('\n\nUwU4\n\n')
// Search name in async function (id, author.empty, both titles, pages, tags, cover)
const search2 = await sHentai.search('dev')
const doujin3 = await sHentai.getDoujin(search2.results[0].id)
console.log(doujin3)
console.log('\n\nUwU9\n\n')


        // Next Page (id, english titles, cover [About 25 pages]) ???????????????
        const search = await sHentai.search('dev')
        const nextPage = await search.next()
        console.log(nextPage.results)
        */
    }
}