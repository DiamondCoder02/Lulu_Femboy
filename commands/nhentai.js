const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
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
            .setRequired(true)
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
        )
        /*.addSubcommand(subcommand => subcommand
            .setName('specifics')
            .setDescription('Id, Author, Name')
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
            )
            //.addIntegerOption(option => option.setName('int').setDescription('Give ID to read'))
        )
        .addSubcommand(subcommand => subcommand
            .setName('gets')
            .setDescription('random, new, popular')
            .addStringOption(option =>
                option.setName('get')
                .setDescription('Choose one you want to see:')
                .addChoice('Random', 'random')
                .addChoice('New', 'new')
                .addChoice('Popular', 'popular')
                .setRequired(true)
            )
        )*/,
	async execute(interaction, client) {
        await interaction.reply({content: "UwU"})

// in async function
const nHentai = require('shentai')
const sHentai = new nHentai
console.log('\n\nUwU1\n\n')

// Search number, in async function (id, author.empty, both titles, pages, tags, cover)
const doujin = await sHentai.getDoujin('395038')
console.log(doujin)
console.log('\n\nUwU8\n\n')
// Get a indicated Doujin (id, author.empty, both titles, pages, tags, cover)
await sHentai.getDoujin('395038').then(doujin => console.log(doujin))
console.log('\n\nUwU3\n\n')

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

// Get a Random Doujin (id, author.empty, both titles, pages, tags, cover)
await sHentai.getRandom().then(doujin => console.log(doujin))
console.log('\n\nUwU2\n\n')
// Random, in async function (id, author.empty, both titles, pages, tags, cover)
const doujin2 = await sHentai.getRandom()
console.log(doujin2)
console.log('\n\nUwU7\n\n')

// New, in async function (id, english titles, cover [About 25 pages])
const doujins2 = await sHentai.getNew()
console.log(doujins2)
console.log('\n\nUwU5\n\n')

// Popular, in async function  (id, english titles, cover [About 5 pages])
const doujins = await sHentai.getPopular()
console.log(doujins)
console.log('\n\nUwU6\n\n')

        // Next Page (id, english titles, cover [About 25 pages]) ???????????????
        const search = await sHentai.search('dev')
        const nextPage = await search.next()
        console.log(nextPage.results)
    }
}