const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("Very basic 8ball command.")
		.addStringOption(option => option.setName("question").setDescription("Enter a question").setRequired(true)),
	async execute(interaction) {
		let item = randomItem();
		const string = interaction.options.getString("question");
		const embed = new EmbedBuilder()
			.setColor([0, 255, 0])
			.setDescription(`**${string}**` + "\n8ball says: " + item);
		await interaction.reply({ embeds: [embed] });
	}
};

function randomItem(){
	let items = ["It is certain.",
		"It is decidedly so.",
		"Without a doubt.",
		"Yes — definitely.",
		"You may rely on it.",
		"As I see it, yes.",
		"Most likely.",
		"Outlook good.",
		"Yes.",
		"Signs point to yes.",
		"Reply hazy, try again.",
		"Ask again later.",
		"Better not tell you now.",
		"Cannot predict now.",
		"Concentrate and ask again.",
		"Don't count on it.",
		"My reply is no.",
		"My sources say no.",
		"Outlook not so good.",
		"Very doubtful.",
		"IDK. All I know you are a good person and I support you ^^"
	];
	return items[Math.floor(Math.random() * items.length)];
}