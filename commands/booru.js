//lewd command (Gihub Copilot)
const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
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
            .addChoice('konachan.com', 'konac')
            .addChoice('konachan.net (wholesome)', 'konan')
            .addChoice('yande.re', 'yandere')
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
        .addNumberOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.').setMinValue(1).setMaxValue(10)),
    async execute(interaction, client, config, lang) {
    try{
        if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { interaction.reply(lang.nsfw); return }
        const sites = interaction.options.getString('sites')
        const tags = interaction.options.getString('tags')
        const repeat = interaction.options.getNumber('repeat')
        console.log(sites + "\n" + tags + "\n" + repeat)
        // Search with promises
        Booru.search(sites, tags, { limit: 1, random: true }).then(posts => {
            for (let post of posts) {
                console.log(post + "\n ------------------------------------------- \n")
                console.log(posts)
                //embed
                const embed = new MessageEmbed()
                    .setTitle(sites)
                    .setColor('#ff0000')
                    .setDescription('Searching for ' + tags + ' on ' + sites)
                    .setImage(post.fileUrl)
                    .setTimestamp()
                try{
                    interaction.reply({embeds: [embed]})
                    console.log(post.fileUrl)
                }catch{
                    interaction.followUp({embeds: [embed]})
                    console.log(post.fileUrl)
                }
            }
        }).catch(err => {
            if (err instanceof BooruError) {
            // It's a custom error thrown by the package
            // Typically results from errors the boorus returns, eg. "too many tags"
                console.error(err)
            } else {
            // This means something pretty bad happened
                console.error(err)
            }
        })

        /*
        async function booruSearch(sites, tags, limit = 1, random = true) {
            try{
            const posts = await Booru.search(sites, tags, {limit, random})
            return console.log(posts[0].fileUrl)
            } catch (err) { console.log(err) }
        }
        booruSearch(sites, tags, 1, true)
        */
    } catch (err) { console.log(err) }
    }
};