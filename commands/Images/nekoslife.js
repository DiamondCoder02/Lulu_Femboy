const { SlashCommandBuilder } = require("@discordjs/builders"), { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const nekoslife = require("nekos.life"), neko = new nekoslife();
module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName("nekoslife")
		.setDescription("Get wholesome Nekoslife images")
		.addSubcommand(subcommand => subcommand
			.setName("wholesome")
			.setDescription("Wholesome pictures from Nekoslife.")
			.addStringOption(option => option.setName("sfw_w")
				.setDescription("Wholesome category")
				.addChoices(
					{ name: "Baka", value: "baka" },
					{ name: "Cuddle", value: "cuddle" },
					{ name: "Feed", value: "feed" },
					{ name: "Fox Girl", value: "foxGirl" },
					{ name: "Holo", value: "holo" },
					{ name: "Hug", value: "hug" },
					{ name: "Kiss", value: "kiss" },
					{ name: "Meow", value: "meow" },
					{ name: "Neko", value: "neko" },
					{ name: "Neko Gif", value: "nekoGif" },
					{ name: "Pat", value: "pat" },
					{ name: "Poke", value: "poke" },
					{ name: "Slap", value: "slap" },
					{ name: "Smug", value: "smug" },
					{ name: "Tickle", value: "tickle" }
				)
				.setRequired(true))
			.addUserOption(option => option.setName("target").setDescription("Ping your friend if you want."))
			.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
		).addSubcommand(subcommand => subcommand
			.setName("sfw_other")
			.setDescription("Wholesome others from Nekoslife.")
			.addStringOption(option => option.setName("sfw_o")
				.setDescription("Wholesome category")
				.addChoices(
					{ name: "8ball", value: "eightBall" },
					{ name: "Avatar / Profile Pictures", value: "avatar" },
					{ name: "CatText", value: "catText" },
					{ name: "Fact", value: "fact" },
					{ name: "Genetically Engineered CatGirl", value: "gecg" },
					{ name: "Goose", value: "goose" },
					{ name: "Kemonomimi", value: "kemonomini" },
					{ name: "Lizard", value: "lizard" },
					{ name: "OwOify", value: "OwOify" },
					{ name: "Spoiler", value: "spoiler" },
					{ name: "Waifus", value: "waifu" },
					{ name: "Wallpaper", value: "wallpaper" },
					{ name: "Why", value: "why" },
					{ name: "Woof", value: "woof" }
				)
				.setRequired(true))
			.addStringOption(option => option.setName("text").setDescription("You need to give a text for OwOify, Spoiler and 8ball."))
			.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
		),
	async execute(interaction, client) {
		await interaction.deferReply();
		let c = "", img = "";
		let amount = 1;
		if (interaction.options.getNumber("repeat")) { amount = Number(interaction.options.getNumber("repeat")) }
		for (let a = 0; a < amount; a++) {
			if (interaction.options.getString("sfw_w")) { c = interaction.options.getString("sfw_w") }
			if (interaction.options.getString("sfw_o")) { c = interaction.options.getString("sfw_o") }
			const embed = new EmbedBuilder()
				.setColor([0, 255, 0])
				.setTitle("OwO, " + c)
				.setTimestamp()
				.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });
			switch (c) {
				case "baka": img = await neko.tickle(); break;
				case "cuddle": img = await neko.cuddle(); break;
				case "feed": img = await neko.feed(); break;
				case "foxGirl": img = await neko.foxGirl(); break;
				case "holo": img = await neko.holo(); break;
				case "hug": img = await neko.hug(); break;
				case "kiss": img = await neko.kiss(); break;
				case "meow": img = await neko.meow(); break;
				case "neko": img = await neko.neko(); break;
				case "nekoGif": img = await neko.nekoGif(); break;
				case "pat": img = await neko.pat(); break;
				case "poke": img = await neko.poke(); break;
				case "slap": img = await neko.slap(); break;
				case "smug": img = await neko.smug(); break;
				case "tickle": img = await neko.tickle(); break;

				case "woof": img = await neko.woof(); break;
				case "wallpaper": img = await neko.wallpaper(); break;
				case "goose": img = await neko.goose(); break;
				case "gecg": img = await neko.gecg(); break;
				case "avatar": img = await neko.avatar(); break;
				case "waifu": img = await neko.waifu(); break;
				case "lizard": img = await neko.lizard(); break;
				case "kemonomini": img = await neko.kemonomini(); break;

				case "why": { img = await neko.why(); let text = img.why; embed.setDescription(text); return interaction.reply({ embeds: [embed] }) }
				case "catText": { img = await neko.catText(); let text = img.cat; embed.setDescription(text); return interaction.reply({ embeds: [embed] }) }
				case "OwOify": { img = await neko.OwOify({ text: interaction.options.getString("text") }); const text = img.owo; if (interaction.options.getString("text")) { embed.setDescription(text); return interaction.reply({ embeds: [embed] }) } else { return interaction.reply("You need to give a text for OwOify, Spoiler and 8ball.") } }
				case "eightBall": { img = await neko.eightBall({ text: interaction.options.getString("text") }); const text = img.response; if (interaction.options.getString("text")) { embed.setDescription(text); return interaction.reply({ embeds: [embed] }) } else { return interaction.reply("You need to give a text for OwOify, Spoiler and 8ball.") } }
				case "fact": { img = await neko.fact(); const text = img.fact; embed.setDescription(text); return interaction.reply({ embeds: [embed] }) }
				case "spoiler": { img = await neko.spoiler({ text: interaction.options.getString("text") }); const text = img.owo; if (interaction.options.getString("text")) { embed.setDescription(text); return interaction.reply({ embeds: [embed] }) } else { return interaction.reply("You need to give a text for OwOify, Spoiler and 8ball.") } }
			}
			if (img.msg === "404") { embed.setDescription("**Error: 404**") } else { embed.setImage(String(img.url)) }
			if (interaction.options.getUser("target")) {
				const user = interaction.options.getUser("target"), from = interaction.user;
				embed.setDescription(from.toString() + " sends you a nice " + interaction.options.getString("sfw_w") + ", " + user.toString() + ". :3");
				try { await interaction.followUp({ embeds: [embed] }) }
				catch {
					interaction.editReply({ embeds: [embed] });
					// WHY THE FUCK WONT YOU WORK???
					await interaction.followUp(user.toString());
				}
			} else {
				try { await interaction.followUp({ embeds: [embed] }) }
				catch { interaction.editReply({ embeds: [embed] }) }
			}
			await wait(1000);
		}
	}
};