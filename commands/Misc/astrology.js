const { SlashCommandBuilder } = require("@discordjs/builders"), { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("astrology")
		.setDescription("Astrology. (Updates around every UTC at 7am)")
		.addStringOption(option => option.setName("signs").setDescription("Enter a horoscope")
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
	async execute(interaction) {
		const type = interaction.options.getString("signs");
		try {
			let sign = await fetch(`https://ohmanda.com/api/horoscope/${type}/`).then(res => res.text()).then(data => JSON.parse(data));
			// Console.log(sign)
			const embed = new EmbedBuilder()
				.setTitle("Horoscope: " + sign.sign)
				.setDescription(sign.horoscope)
				.setTimestamp();
			const linkStart = "https://static.vecteezy.com/system/resources/previews/003/";
			const linkEnd = "-isolated-icon-zodiac-symbol-with-starry-gradient-design-astrological-element-vector.jpg";
			switch (type) {
			case "capricorn": embed.setColor([192, 192, 192]).setFooter({ text: "Date: Dec.22-Jan.19" }).setThumbnail(linkStart+"808/499/non_2x/zodiac-sign-capricorn"+linkEnd); break; // #C0C0C0 Grey
			case "aquarius": embed.setColor([0, 0, 255]).setFooter({ text: "Date: Jan.20-Feb.18" }).setThumbnail(linkStart+"808/504/non_2x/zodiac-sign-aquarius"+linkEnd); break; // #0000CD Blue
			case "pisces": embed.setColor([144, 238, 144]).setFooter({ text: "Date: Feb.19-Mar.20" }).setThumbnail(linkStart+"808/502/non_2x/zodiac-sign-pisces"+linkEnd); break; // #90ee90 Lightgreen
			case "aries": embed.setColor([255, 0, 0]).setFooter({ text: "Date: Mar.21-Apr.20" }).setThumbnail(linkStart+"758/707/non_2x/zodiac-sign-aries"+linkEnd); break; // #FF0000 Red
			case "taurus": embed.setColor([0, 128, 0]).setFooter({ text: "Date: Apr.21-May.20" }).setThumbnail(linkStart+"758/705/non_2x/zodiac-sign-taurus"+linkEnd); break; // #008000 Green
			case "gemini": embed.setColor([255, 255, 0]).setFooter({ text: "Date: May.21-Jun.20" }).setThumbnail(linkStart+"808/495/non_2x/zodiac-sign-gemini"+linkEnd); break; // #FFFF00 Yellow
			case "cancer": embed.setColor([192, 192, 192]).setFooter({ text: "Date: Jun.21-Jul.22" }).setThumbnail(linkStart+"808/496/non_2x/zodiac-sign-cancer"+linkEnd); break; // #C0C0C0 Grey
			case "leo": embed.setColor([255, 90, 0]).setFooter({ text: "Date: Jul.23-Aug.22" }).setThumbnail(linkStart+"808/497/non_2x/zodiac-sign-leo"+linkEnd); break; // #FF5A00 Orange
			case "virgo": embed.setColor([205, 127, 50]).setFooter({ text: "Date: Aug.23-Sep.22" }).setThumbnail(linkStart+"808/498/non_2x/zodiac-sign-virgo"+linkEnd); break; // #CD7F32 Brown
			case "libra": embed.setColor([255, 105, 180]).setFooter({ text: "Date: Sep.23-Oct.22" }).setThumbnail(linkStart+"808/500/non_2x/zodiac-sign-libra"+linkEnd); break; // #FF69B4 Pink
			case "scorpio": embed.setColor([0, 0, 0]).setFooter({ text: "Date: Oct.23-Nov.21" }).setThumbnail(linkStart+"808/503/non_2x/zodiac-sign-scorpio"+linkEnd); break; // #000000 Black
			case "sagittarius": embed.setColor([160, 32, 240]).setFooter({ text: "Date: Nov.22-Dec.21" }).setThumbnail(linkStart+"808/501/non_2x/zodiac-sign-sagittarius"+linkEnd); break; // #A020F0 Purple
			}
			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			interaction.reply(`Something went wrong with ${type}! ` + error.name);
		}
	}
};