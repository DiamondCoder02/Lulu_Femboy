const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const wait = require("node:timers/promises").setTimeout;
module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName("waifu_pics")
		.setDescription("Pictures from waifu.pics")
		.addSubcommand(subcommand => subcommand.setName("uwu").setDescription("1/2 pictures")
			.addStringOption(option => option.setName("category").setDescription("category")
				.addChoices(
					{ name: "waifu", value: "waifu" },
					{ name: "neko", value: "neko" },
					{ name: "shinobu", value: "shinobu" },
					{ name: "megumin", value: "megumin" },
					{ name: "bully", value: "bully" },
					{ name: "cuddle", value: "cuddle" },
					{ name: "cry", value: "cry" },
					{ name: "hug", value: "hug" },
					{ name: "awoo", value: "awoo" },
					{ name: "kiss", value: "kiss" },
					{ name: "lick", value: "lick" },
					{ name: "pat", value: "pat" },
					{ name: "smug", value: "smug" },
					{ name: "bonk", value: "bonk" },
					{ name: "yeet", value: "yeet" },
					{ name: "blush", value: "blush" },
					{ name: "smile", value: "smile" },
					{ name: "wave", value: "wave" },
					{ name: "highfive", value: "highfive" },
					{ name: "handhold", value: "handhold" }
				)
				.setRequired(true))
			.addUserOption(option => option.setName("target").setDescription("Ping your friend if you want."))
			.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
		)
		.addSubcommand(subcommand => subcommand.setName("owo").setDescription("2/2 pictures")
			.addStringOption(option => option.setName("category").setDescription("category")
				.addChoices(
					{ name: "nom", value: "nom" },
					{ name: "bite", value: "bite" },
					{ name: "glomp", value: "glomp" },
					{ name: "slap", value: "slap" },
					{ name: "kill", value: "kill" },
					{ name: "kick", value: "kick" },
					{ name: "happy", value: "happy" },
					{ name: "wink", value: "wink" },
					{ name: "poke", value: "poke" },
					{ name: "dance", value: "dance" },
					{ name: "cringe", value: "cringe" }
				)
				.setRequired(true))
			.addUserOption(option => option.setName("target").setDescription("Ping your friend if you want."))
			.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
		),
	async execute(interaction) {
		let amount = 1;
		if (interaction.options.getNumber("repeat")) { amount = Number(interaction.options.getNumber("repeat")) }
		const category = interaction.options.getString("category");
		for (let a = 0; a < amount; a++) {
			let response = await fetch(`https://api.waifu.pics/sfw/${category}`);
			let data = await response.text();
			const img = JSON.parse(data);
			const embed = new EmbedBuilder()
				.setImage(img.url)
				.setFooter({ text: `${category} - ${a + 1}/${amount}` })
				.setColor([0, 255, 0]);
			if (interaction.options.getUser("target")) {
				const user = interaction.options.getUser("target"), from = interaction.user;
				switch (category) {
				case "nom": embed.setDescription(`${from} nommed ${user}. How tasty! >w<`); break;
				case "bite": embed.setDescription(`${from} bit ${user}. How evil >.<`); break;
				case "slap": embed.setDescription(`${from} slapped ${user}. Baka!`); break;
				case "kill": embed.setDescription(`${from} want's to kill ${user}. Oh no. >.<`); break;
				case "kick": embed.setDescription(`${from} kicked ${user}. I wonder why...`); break;
				case "happy": embed.setDescription(`${from} is happy because ${user}! :3`); break;
				case "wink": embed.setDescription(`${from} winked at ${user}. How cute!`); break;
				case "poke": embed.setDescription(`${from} poked ${user}. X3`); break;
				case "dance": embed.setDescription(`${from} danced with ${user}. How amazing! ^^`); break;
				case "cringe": embed.setDescription(`${from} cringes ${user}. Why?`); break;
				case "bully": embed.setDescription(`${from} bullied ${user}. How mean!`); break;
				case "cuddle": embed.setDescription(`${from} cuddled ${user}. How cute!`); break;
				case "cry": embed.setDescription(`${from} cried because ${user}. Evil!`); break;
				case "hug": embed.setDescription(`${from} hugged ${user}. How sweet!`); break;
				case "awoo": embed.setDescription(`${from} awooed at ${user}. Awoo!`); break;
				case "kiss": embed.setDescription(`${from} kissed ${user}. How romantic!`); break;
				case "lick": embed.setDescription(`${from} licked ${user}. How tasty!`); break;
				case "pat": embed.setDescription(`${from} patted ${user}. How cute!`); break;
				case "smug": embed.setDescription(`${from} is smug at ${user}. ( ͡• ͜ʖ ͡• )`); break;
				case "bonk": embed.setDescription(`${from} bonked ${user}. How naughty!`); break;
				case "yeet": embed.setDescription(`${from} yeeted ${user}. See you!`); break;
				case "blush": embed.setDescription(`${from} blushed because ${user}. (❁´◡\`❁)`); break;
				case "wave": embed.setDescription(`${from} waved at ${user}. []~(￣▽￣)~*`); break;
				case "highfive": embed.setDescription(`${from} highfived ${user}. Slap!`); break;
				case "handhold": embed.setDescription(`${from} handholded ${user}. How lewd!`); break;
				default: embed.setDescription(`${from} sends you a nice ${category}, ${user}. :3`); break;
				}
				try { await interaction.channel.send({ content: user.toString(), embeds: [embed] }) }
				catch { interaction.channel.send({ content: user.toString(), embeds: [embed] }) }
			} else {
				try { await interaction.channel.send({ embeds: [embed] }) }
				catch { interaction.channel.send({ embeds: [embed] }) }
			}
			await wait(1000);
		}
	}
};