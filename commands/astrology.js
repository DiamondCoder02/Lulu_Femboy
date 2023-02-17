const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
	data: new SlashCommandBuilder()
        .setName('astrology')
        .setDescription('Astrology. (Updates around every UTC at 7am)')
        .addStringOption(option => option.setName('signs').setDescription('Enter a horoscope')
            .addChoices(
                { name: "Capricorn (Dec.22-Jan.19)", value: "capricorn" },
                { name: "Aquarius (Jan.20-Feb.18)", value: "aquarius" },
                { name: "Pisces (Feb.19-Mar.20)", value: "pisces" },
                { name: "Aries (Mar.21-Apr.20)", value: "aries" },
                { name: "Taurus (Apr.21-May.20)", value: "taurus" },
                { name: "Gemini (May.21-Jun.20)", value: "gemini" },
                { name: "Cancer (Jun.21-Jul.22)", value: "cancer" },
                { name: "Leo (Jul.23-Aug.22)", value: "leo" },
                { name: "Virgo (Aug.23-Sep.22)", value: "virgo" },
                { name: "Libra (Sep.23-Oct.22)", value: "libra" },
                { name: "Scorpio (Oct.23-Nov.21)", value: "scorpio" },
                { name: "Sagittarius (Nov.22-Dec.21)", value: "sagittarius" }
            )
            .setRequired(true)
        ),
    async execute(interaction, client) {
        const type = interaction.options.getString('signs');
        try {
            let sign = await fetch(`https://ohmanda.com/api/horoscope/${type}/`).then(res => res.text()).then(data => JSON.parse(data));
            //console.log(sign)
            const embed = new EmbedBuilder()
                .setTitle('Horoscope: ' + sign.sign)
                .setDescription(sign.horoscope)
                .setTimestamp()
            switch (type) {
                case 'capricorn': embed.setColor('#C0C0C0').setFooter({ text: 'Date: Dec.22-Jan.19' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/499/non_2x/zodiac-sign-capricorn-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'aquarius': embed.setColor('#0000CD').setFooter({ text: 'Date: Jan.20-Feb.18' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/504/non_2x/zodiac-sign-aquarius-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'pisces': embed.setColor('#90ee90 ').setFooter({ text: 'Date: Feb.19-Mar.20' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/502/non_2x/zodiac-sign-pisces-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'aries': embed.setColor('#FF0000').setFooter({ text: 'Date: Mar.21-Apr.20' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/758/707/non_2x/zodiac-sign-aries-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'taurus': embed.setColor('#008000').setFooter({ text: 'Date: Apr.21-May.20' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/758/705/non_2x/zodiac-sign-taurus-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'gemini': embed.setColor('#FFFF00').setFooter({ text: 'Date: May.21-Jun.20' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/495/non_2x/zodiac-sign-gemini-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'cancer': embed.setColor('#C0C0C0').setFooter({ text: 'Date: Jun.21-Jul.22' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/496/non_2x/zodiac-sign-cancer-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'leo': embed.setColor('#FF5A00').setFooter({ text: 'Date: Jul.23-Aug.22' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/497/non_2x/zodiac-sign-leo-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'virgo': embed.setColor('#CD7F32').setFooter({ text: 'Date: Aug.23-Sep.22' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/498/non_2x/zodiac-sign-virgo-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'libra': embed.setColor('#FF69B4').setFooter({ text: 'Date: Sep.23-Oct.22' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/500/non_2x/zodiac-sign-libra-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'scorpio': embed.setColor('#000000').setFooter({ text: 'Date: Oct.23-Nov.21' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/503/non_2x/zodiac-sign-scorpio-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
                case 'sagittarius': embed.setColor('#A020F0').setFooter({ text: 'Date: Nov.22-Dec.21' }).setThumbnail("https://static.vecteezy.com/system/resources/previews/003/808/501/non_2x/zodiac-sign-sagittarius-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg"); break;
            }
            await interaction.reply({ embeds: [embed] })
        }catch(error) {
            interaction.reply(`Something went wrong with ${type}! ` + error.name)
            console.log(error)
        }
    }
}