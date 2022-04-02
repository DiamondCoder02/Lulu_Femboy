//rule34 command (Writen by Gihub Copilot)
const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow,MessageButton,MessageEmbed} = require('discord.js')
const Booru = require('booru')
const { BooruError } = require('booru')
module.exports = {
	//guildOnly: true,
	cooldown: 1,
    data: new SlashCommandBuilder()
        .setName('booru')
        .setDescription('Search rule34 for a picture')
        .addStringOption(option => option.setName('sites').setDescription('Sites to search')
            .addChoice('e621.net', 'e621')
            .addChoice('e926.net (wholesome)', 'e926')
            .addChoice('hypnohub.net', 'hypnohub')
            .addChoice('danbooru.donmai.us', 'danbooru')
            .addChoice('konachan.com', 'konachan_nsfw')
            .addChoice('konachan.net (wholesome)', 'konachan')
            .addChoice('yande.re', 'yande')
            .addChoice('gelbooru.com', 'gelbooru')
            .addChoice('rule34.xxx', 'rule34')
            .addChoice('safebooru.org (wholesome)', 'safebooru')
            .addChoice('tbib.org (wholesome)', 'tbib')
            .addChoice('xbooru.com', 'xbooru')
            .addChoice('rule34.paheal.net', 'paheal')
            .addChoice('derpibooru.org', 'derpibooru')
            .addChoice('realbooru.net', 'realbooru')
            .setRequired(true)
        )
        .addStringOption(option => option.setName('tags').setDescription('Tags to search for').setRequired(true))
        .addNumberOption(option => option.setName('page').setDescription('Page number').setMinValue(1))
        .addNumberOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.').setMinValue(1).setMaxValue(10)),
    async execute(interaction, client, config, lang) {
        if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { interaction.reply(lang.nsfw); return }
        const sites = interaction.options.getString('sites')
        const tags = interaction.options.getString('tags')
        const page = interaction.options.getNumber('page')
        const repeat = interaction.options.getNumber('repeat')
        console.log(sites + "\n" + tags + "\n" + page + "\n" + repeat)
        
        // Search with promises
        Booru.search(sites, { limit: 1, random: false })
        .then(posts => {
            if (posts == "No images found.") {
                console.log('No images found.')
            }
        
            for (let post of posts) {
                console.log(post.fileUrl)
            }
        })
        .catch(err => {
            if (err instanceof BooruError) {
              // It's a custom error thrown by the package
              // Typically results from errors the boorus returns, eg. "too many tags"
                console.error(err)
            } else {
              // This means something pretty bad happened
                console.error(err)
            }
        })

        async function booruSearch(sites, tags, limit = 1, random = true) {
            const posts = await Booru.search(sites, tags, {limit, random})
            return console.log(posts[0].fileUrl)
        }
        booruSearch(sites, tags, 1, true)
    }
};