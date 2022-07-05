const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
const fetch = require('node-fetch')
module.exports = {
	data: new SlashCommandBuilder()
        .setName('astrology')
        .setDescription('Astrology.')
        .addStringOption(option => option.setName('signs').setDescription('Enter a horoscope')
            .addChoice('Capricorn (Dec.22-Jan.19)', 'capricorn')
            .addChoice('Aquarius (Jan.20-Feb.18)', 'aquarius')
            .addChoice('Pisces (Feb.19-Mar.20)', 'pisces')
            .addChoice('Aries (Mar.21-Apr.20)', 'aries')
            .addChoice('Taurus (Apr.21-May.20)', 'taurus')
            .addChoice('Gemini (May.21-Jun.20)', 'gemini')
            .addChoice('Cancer (Jun.21-Jul.22)', 'cancer')
            .addChoice('Leo (Jul.23-Aug.22)', 'leo')
            .addChoice('Virgo (Aug.23-Sep.22)', 'virgo')
            .addChoice('Libra (Sep.23-Oct.22)', 'libra')
            .addChoice('Scorpio (Oct.23-Nov.21)', 'scorpio')
            .addChoice('Sagittarius (Nov.22-Dec.21)', 'sagittarius')
        ),
    async execute(interaction, client, config) {
        try {
            const type = interaction.options.getString('signs');
            sign = await fetch(`https://ohmanda.com/api/horoscope/${type}/`).then(res => res.text()).then(data => JSON.parse(data));
            const embed = new MessageEmbed()
                .setTitle('Horoscope: ' + sign.sign)
                .setDescription(sign.horoscope)
                .setTimestamp()
            if (type === 'capricorn') { embed.setColor('#C0C0C0').setFooter({ text: 'Date: Dec.22-Jan.19' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/499/non_2x/zodiac-sign-capricorn-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'aquarius') { embed.setColor('#0000CD').setFooter({ text: 'Date: Jan.20-Feb.18' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/504/non_2x/zodiac-sign-aquarius-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'pisces') { embed.setColor('#90ee90 ').setFooter({ text: 'Date: Feb.19-Mar.20' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/502/non_2x/zodiac-sign-pisces-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'aries') { embed.setColor('#FF0000').setFooter({ text: 'Date: Mar.21-Apr.20' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/758/707/non_2x/zodiac-sign-aries-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'taurus') { embed.setColor('#008000').setFooter({ text: 'Date: Apr.21-May.20' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/758/705/non_2x/zodiac-sign-taurus-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'gemini') { embed.setColor('#FFFF00').setFooter({ text: 'Date: May.21-Jun.20' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/495/non_2x/zodiac-sign-gemini-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'cancer') { embed.setColor('#C0C0C0').setFooter({ text: 'Date: Jun.21-Jul.22' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/496/non_2x/zodiac-sign-cancer-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'leo') { embed.setColor('#FF5A00').setFooter({ text: 'Date: Jul.23-Aug.22' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/497/non_2x/zodiac-sign-leo-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'virgo') { embed.setColor('#CD7F32').setFooter({ text: 'Date: Aug.23-Sep.22' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/498/non_2x/zodiac-sign-virgo-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'libra') { embed.setColor('#FF69B4').setFooter({ text: 'Date: Sep.23-Oct.22' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/500/non_2x/zodiac-sign-libra-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'scorpio') { embed.setColor('#000000').setFooter({ text: 'Date: Oct.23-Nov.21' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/503/non_2x/zodiac-sign-scorpio-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            if (type === 'sagittarius') { embed.setColor('#A020F0').setFooter({ text: 'Date: Nov.22-Dec.21' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/501/non_2x/zodiac-sign-sagittarius-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg") }
            await interaction.reply({ embeds: [embed] })
        }catch(error) {
            console.log(error)
        }
    }
}