const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const Booru = require('booru'), { BooruError } = require('booru');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), s = lang.booru.slash.split('-') , e = lang.booru.embed.split('-')
module.exports = {
	cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('booru')
        .setDescription(s[0])
        .addStringOption(option => option.setName('sites').setDescription(s[1])
            .addChoice('e621.net 18+', 'e621')
            .addChoice('e926.net <18', 'e926')
            //.addChoice('hypnohub.net 18+ (🚫tag)', 'hypnohub')
            //.addChoice('danbooru.donmai.us 18+ (🚫tag)', 'danbooru')
            .addChoice('konachan.com 18+', 'konac')
            .addChoice('konachan.net <18', 'konan')
            .addChoice('yande.re 18+', 'yandere')
            //random false unless a tag is given:
            .addChoice('gelbooru.com 18+', 'gelbooru')
            .addChoice('rule34.xxx 18+', 'rule34')
            .addChoice('safebooru.org <18', 'safebooru')
            .addChoice('tbib.org <18', 'tbib')
            .addChoice('xbooru.com 18+', 'xbooru')
            //.addChoice('rule34.paheal.net 18+ (🚫tag)', 'paheal')
            .addChoice('derpibooru.org 18+', 'derpibooru')
            .addChoice('realbooru.net 18+', 'realbooru')
            .setRequired(true)
        )
        .addStringOption(option => option.setName('tags').setDescription(s[2]))
        .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10)),
    async execute(interaction) {
        const sites = interaction.options.getString('sites').trim()
        if (sites=='e926' || sites=='konan' || sites=="safebooru" || sites=="tbib") { }
        else { if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { return interaction.reply(lang.nsfw) } }
        if (!interaction.options.getString('tags') && (sites==('gelbooru') || sites==('rule34') || sites==('safebooru') || sites==('tbib') || sites==('xbooru') || sites==('paheal') || sites==('derpibooru') || sites==('realbooru'))) { return interaction.reply(lang.booru.tag) }
        else if(!interaction.options.getString('tags')) {tags = ""}
        //else if (interaction.options.getString('tags') && (sites=='hypnohub' || sites=='danbooru' || sites=="paheal")) { return interaction.reply("please don't use tags with this site") }
        else { tags = interaction.options.getString('tags').trim().split(' ')}
        if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
        await interaction.reply(e[6]+"...")
        for (let a = 0; a < amount; ) {
            async function booruSearch(sites, tags, limit = 1, random = true) {
                const posts = await Booru.search(sites, tags, {limit, random})
                if (posts.length === 0) { return interaction.followUp({content: lang.booru.error})}
                //console.log(posts +"\n"+ posts[0].fileUrl)
                //Rating: s: 'Safe' q: 'Questionable' e: 'Explicit' u: 'Unrated'
                if (posts.first.rating == 's') { r = e[0]}
                    else if (posts.first.rating == 'q') { r = e[1]}
                    else if (posts.first.rating == 'e') { r = e[2]}
                    else if (posts.first.rating == 'u') { r = e[3]} 
                    else { r = "-"}
                const embed = new MessageEmbed()
                    .setTitle("🌐"+sites +" ("+ posts.first.booru.domain+")")
                    .setColor('#ff0000')
                    .setAuthor({ name: posts.first.booru.domain, url: "https://"+posts.first.booru.domain })
                    .addField("⚖️"+e[4], r, true)
                    .addField("🔍"+e[5], "*"+tags+"*", true)
                    .setTimestamp()
                if (posts.first.tags.join(', ').length > 1000) {embed.addField("📄"+"Tags: ", "`"+posts.first.tags.join(', ').substring(0,999)+"...`")} else {embed.addField("📄"+"Tags: ", "`"+posts.first.tags.join(', ')+"`")}
                const buttons = new MessageActionRow().addComponents(
                    new MessageButton().setURL(posts[0].fileUrl).setLabel('Link').setStyle('LINK').setEmoji('🖥️'))
                if (posts[0].fileUrl.includes(".webm") || posts[0].fileUrl.includes(".mp4")|| posts[0].fileUrl.includes(".gif")) {
                    await interaction.followUp({embeds: [embed], components: [buttons]})
                    await interaction.followUp({content: posts[0].fileUrl});
                } else {
                    await embed.setImage(posts[0].fileUrl)
                    await interaction.followUp({embeds: [embed], components: [buttons]})
                }
            }
            booruSearch(sites, tags, 1, true).catch(err => { 
                if (err instanceof BooruError) { console.error(err) } 
                else { console.error(err) ; return interaction.followUp({content: lang.booru.error})}
            })
            a+=1
            await wait(2000);
        }
    }
};