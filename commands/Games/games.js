const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("games")
		.setDescription("Some small minigames")
		.addSubcommand(subcommand => subcommand.setName("rpc").setDescription("Rock-Paper-Scissors"))
		.addSubcommand(subcommand => subcommand.setName("numbers").setDescription("Guess the number")
			.addStringOption(option => option.setName("game_mode").setDescription("Who should think about the number")
				.addChoices(
					{ name: "I, the bot will think about a number", value: "bot" },
					{ name: "You, the player think of a number", value: "player" }
				).setRequired(true)
			)
			.addIntegerOption(option => option.setName("min").setDescription("Minimum number (default 1)"))
			.addIntegerOption(option => option.setName("max").setDescription("Maximum number (default 100)"))
			.addIntegerOption(option => option.setName("tries").setDescription("How many tries do we want? (default 10)"))
		)
		.addSubcommand(subcommand => subcommand.setName("ttt").setDescription("Tic-tac-toe game")
			.addStringOption(option => option.setName("who_start").setDescription("Chosse one to start with if you don't want randomly. (\"X\" goes first)")
				.addChoices({ name: "X", value: "first" }, { name: "O", value: "second" })
			)
		),

	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case "rpc": RPC(interaction); break;
			case "numbers": GuessTheNumber(interaction); break;
			case "ttt": TTT(interaction); break;
		}
	}
};

// Rock-Paper-Scissors game
async function RPC(interaction) {
	const rpc = new EmbedBuilder()
		.setTitle("Rock-Paper-Scissors!")
		.setColor([0, 255, 0]);
	const row = new ActionRowBuilder()
		.addComponents(
			new StringSelectMenuBuilder()
				.setCustomId("select")
				.setPlaceholder("Nothing selected")
				.addOptions(
					{ label: "Rock", value: "rock" },
					{ label: "Paper", value: "paper" },
					{ label: "Scissors", value: "scissors" }
				)
		);
	await interaction.reply({ embeds: [rpc], components: [row] });
	// First user chooses what they wanna play

	// Bot just randomly chooses
	let bN = Math.floor(Math.random() * 3) + 1;
	let bNw;
	switch (bN) {
		case 1: bNw = "rock"; break;
		case 2: bNw = "paper"; break;
		case 3: bNw = "scissors"; break;
	}

	// Due to discord I need a collector to keep the interaction alive
	const filter = i => { i.deferUpdate(); return i.user.id === interaction.user.id };
	const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 });

	// When user chooses, we compare the results
	collector.on("collect", async i => {
		let pA;
		switch (i.values[0]) {
			case "rock": pA = 1; break;
			case "paper": pA = 2; break;
			case "scissors": pA = 3; break;
		}

		// 1=rock, 2=paper, 3=scissors
		if (pA === bN) { rpc.setDescription("We both chose `" + i.values[0] + "`\nIt's **a tie**"); await interaction.followUp({ embeds: [rpc] }) }
		if ((pA === 1 && bN === 2) || (pA === 2 && bN === 3) || (pA === 3 && bN === 1)) { rpc.setDescription("You chose `" + i.values[0] + "` and I chose `" + bNw + "`\n**I win**"); await interaction.followUp({ embeds: [rpc] }) }
		if ((pA === 1 && bN === 3) || (pA === 2 && bN === 1) || (pA === 3 && bN === 2)) { rpc.setDescription("You chose `" + i.values[0] + "` and I chose `" + bNw + "`\n**You win**"); await interaction.followUp({ embeds: [rpc] }) }
		collector.stop();
	});
}

// Guess the number game
async function GuessTheNumber(interaction) {
	const game_mode = interaction.options.getString("game_mode");
	let min = interaction.options.getInteger("min") || 1;
	let max = interaction.options.getInteger("max") || 100;
	let tries = interaction.options.getInteger("tries") || 10;
	const embed = new EmbedBuilder()
		.setTitle("Guess the number!")
		.setColor("#00FF00");

	if (game_mode === "bot") {
		let number = Math.floor(Math.random() * (max - min + 1)) + min;
		let highLow = "???";
		const start = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("start").setLabel("Start").setStyle(ButtonStyle.Primary));
		const end = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("End").setStyle(ButtonStyle.Link).setURL("https://discord.gg/DcQS9mNEUh"));

		embed.setDescription("I'm thinking of a number between " + min + " and " + max + ". Here are 10 random numbers. Take a guess. \n(You have " + tries + " tries to guess it!)");
		await interaction.reply({ embeds: [embed], components: [start] });

		const filter = i => { i.deferUpdate(); return i.user.id === interaction.user.id };
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
		let numbers = [];
		collector.on("collect", async i => {
			if (number >= numbers[Number(i.customId)]) { highLow = "higher"; tries--; min = numbers[Number(i.customId)] }
			if (number <= numbers[Number(i.customId)]) { highLow = "lower"; tries--; max = numbers[Number(i.customId)] }
			if (numbers[Number(i.customId)] === number) { embed.setDescription(`You **won**! The number was: ${number}.`); await interaction.editReply({ embeds: [embed], components: [end] }); collector.stop(); return }
			else if (tries === 0) { embed.setDescription(`You **lost**! You couldn't guess the number ${number}.`); await interaction.editReply({ embeds: [embed], components: [end] }); collector.stop(); return }
			numbers = [];
			for (let i = 0; i < 10; i++) { numbers.push(Math.floor(Math.random() * (max - min + 1)) + min) }
			const buttons = new ActionRowBuilder().addComponents(
				new ButtonBuilder().setCustomId("0").setLabel(`${String(numbers[0])}`).setStyle(ButtonStyle.Secondary),
				new ButtonBuilder().setCustomId("1").setLabel(`${String(numbers[1])}`).setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId("2").setLabel(`${String(numbers[2])}`).setStyle(ButtonStyle.Secondary),
				new ButtonBuilder().setCustomId("3").setLabel(`${String(numbers[3])}`).setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId("4").setLabel(`${String(numbers[4])}`).setStyle(ButtonStyle.Secondary)
			);
			const buttons2 = new ActionRowBuilder().addComponents(
				new ButtonBuilder().setCustomId("5").setLabel(`${String(numbers[5])}`).setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId("6").setLabel(`${String(numbers[6])}`).setStyle(ButtonStyle.Secondary),
				new ButtonBuilder().setCustomId("7").setLabel(`${String(numbers[7])}`).setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId("8").setLabel(`${String(numbers[8])}`).setStyle(ButtonStyle.Secondary),
				new ButtonBuilder().setCustomId("9").setLabel(`${String(numbers[9])}`).setStyle(ButtonStyle.Primary)
			);
			embed.setDescription(`The number was **${highLow}**\nThe number is between ` + min + " and " + max + ". Here are 10 random numbers. Take a guess. \n(You have " + tries + " tries to guess it!)");
			await interaction.editReply({ embeds: [embed], components: [buttons, buttons2] });
		});
	} else {
		const buttons = new ActionRowBuilder().addComponents(
			new ButtonBuilder().setCustomId("high").setLabel("Higher").setStyle(ButtonStyle.Success).setEmoji("⬆️"),
			new ButtonBuilder().setCustomId("low").setLabel("Lower").setStyle(ButtonStyle.Danger).setEmoji("⬇️"),
			new ButtonBuilder().setCustomId("equal").setLabel("Guessed it").setStyle(ButtonStyle.Primary)
		);
		const end = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("End").setStyle(ButtonStyle.Link).setURL("https://discord.gg/DcQS9mNEUh"));

		let guessingNum = Math.floor(Math.random() * (max - min + 1)) + min;
		embed.setDescription("I'm thinking of the number " + guessingNum + "!\nIs your number higher or lower? \n(I have " + tries + " tries left)");
		interaction.reply({ embeds: [embed], components: [buttons] });

		const filter = i => { i.deferUpdate(); return i.user.id === interaction.user.id };
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
		collector.on("collect", async i => {
			if (i.customId === "high") {
				min = guessingNum;
				guessingNum = Math.floor(Math.random() * (max - min + 1)) + min;
				tries--;
			}
			if (i.customId === "low") {
				max = guessingNum;
				guessingNum = Math.floor(Math.random() * (max - min + 1)) + min;
				tries--;
			}
			embed.setDescription("I'm thinking of the number " + guessingNum + "!\nIs your number higher or lower? \n(I have " + tries + " tries left)");
			await interaction.editReply({ embeds: [embed] });
			if (i.customId === "equal") { embed.setDescription(`I **won**! The number was: ${guessingNum}.`); await interaction.editReply({ embeds: [embed], components: [end] }); collector.stop() }
			else if (tries === 0) { embed.setDescription("I **lost**! I couldn't guess the number."); await interaction.editReply({ embeds: [embed], components: [end] }); collector.stop() }
		});
	}
}

// Tic-tac-toe game
async function TTT(interaction) {
	const tttEmbed = new EmbedBuilder()
		.setTitle("Tic Tac Toe")
		.setColor("#00FF00");
	let base = [2, 2, 2, 2, 2, 2, 2, 2, 2]; // 2=- , 1=X , 0=O
	let turn = 2, bot = 2, winner = "none";

	if (interaction.options.getString("who_start") === "second") { turn = 0, bot = 1 }
	else if (interaction.options.getString("who_start") === "first") { turn = 1, bot = 0 }
	else { turn = Math.floor(Math.random() * 2), bot = Math.abs(turn - 1) }
	if (turn == 0) {
		let random = Math.floor(Math.random() * 9);
		while (base[random] != 2) { random = Math.floor(Math.random() * 9) }
		base[random] = 1;
	}
	const start = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("start").setLabel("Start").setStyle(ButtonStyle.Success));
	const end = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("End").setStyle(ButtonStyle.Link).setURL("https://discord.gg/DcQS9mNEUh"));
	tttEmbed.setDescription("Click the button to start the game!");
	await interaction.reply({ embeds: [tttEmbed], components: [start] });

	const filter = i => { i.deferUpdate(); return i.user.id === interaction.user.id };
	const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
	collector.on("collect", async i => {
		// If check is done, continue the game
		if (turn == 1) {
			base[Number(i.customId)] = 1;
			endGame();
			if (bot == 1) {
				let random = Math.floor(Math.random() * 9);
				while (base[random] != 2) { random = Math.floor(Math.random() * 9) }
				base[random] = 0;
			}
			bot = 1;
		}
		else if (turn == 0 && bot == 0) {
			base[Number(i.customId)] = 0;
			endGame();
			let random = Math.floor(Math.random() * 9);
			while (base[random] != 2) { random = Math.floor(Math.random() * 9) }
			base[random] = 1;
		}
		endGame();
		if (turn == 0) { bot = 0 }
	});

	// Check if the game is over
	function game_overQ() {
		if (winnerQ(0, 1, 2) || winnerQ(3, 4, 5) || winnerQ(6, 7, 8) // Horizontal
			|| winnerQ(0, 3, 6) || winnerQ(1, 4, 7) || winnerQ(2, 5, 8) // Vertical
			|| winnerQ(0, 4, 8) || winnerQ(6, 4, 2) // Diagonal
		) {
			return true;
		} else if (stalemateQ()) { return "fuck" }
	}

	// Functions for checking
	function winnerQ(p1, p2, p3) { winner = base[p1]; return (base[p1] != 2) && (base[p1] == base[p2]) && (base[p2] == base[p3]) }
	function stalemateQ() { for (let i = 0; i < 9; i++) { if (base[i] == 2) { return false } } return true }

	// End game
	async function endGame() {
		const row1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("0").setLabel(base[0] == 2 ? "-" : (base[0] == 1 ? "X" : "O")).setStyle(base[0] == 2 ? ButtonStyle.Success : (base[0] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[0] == 2 ? false : true), new ButtonBuilder().setCustomId("1").setLabel(base[1] == 2 ? "-" : (base[1] == 1 ? "X" : "O")).setStyle(base[1] == 2 ? ButtonStyle.Success : (base[1] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[1] == 2 ? false : true), new ButtonBuilder().setCustomId("2").setLabel(base[2] == 2 ? "-" : (base[2] == 1 ? "X" : "O")).setStyle(base[2] == 2 ? ButtonStyle.Success : (base[2] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[2] == 2 ? false : true));
		const row2 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("3").setLabel(base[3] == 2 ? "-" : (base[3] == 1 ? "X" : "O")).setStyle(base[3] == 2 ? ButtonStyle.Success : (base[3] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[3] == 2 ? false : true), new ButtonBuilder().setCustomId("4").setLabel(base[4] == 2 ? "-" : (base[4] == 1 ? "X" : "O")).setStyle(base[4] == 2 ? ButtonStyle.Success : (base[4] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[4] == 2 ? false : true), new ButtonBuilder().setCustomId("5").setLabel(base[5] == 2 ? "-" : (base[5] == 1 ? "X" : "O")).setStyle(base[5] == 2 ? ButtonStyle.Success : (base[5] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[5] == 2 ? false : true));
		const row3 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("6").setLabel(base[6] == 2 ? "-" : (base[6] == 1 ? "X" : "O")).setStyle(base[6] == 2 ? ButtonStyle.Success : (base[6] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[6] == 2 ? false : true), new ButtonBuilder().setCustomId("7").setLabel(base[7] == 2 ? "-" : (base[7] == 1 ? "X" : "O")).setStyle(base[7] == 2 ? ButtonStyle.Success : (base[7] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[7] == 2 ? false : true), new ButtonBuilder().setCustomId("8").setLabel(base[8] == 2 ? "-" : (base[8] == 1 ? "X" : "O")).setStyle(base[8] == 2 ? ButtonStyle.Success : (base[8] == 1 ? ButtonStyle.Primary : ButtonStyle.Secondary)).setDisabled(base[8] == 2 ? false : true));
		tttEmbed.setDescription("Your turn!");
		let ending = game_overQ();
		if (ending === "fuck") { tttEmbed.setDescription("Stalemate! \nNo one win!"); await interaction.editReply({ embeds: [tttEmbed], components: [end] }); collector.stop(); return }
		else if (ending) { tttEmbed.setDescription(`Game has ended! \nThe winner is ${winner ? "X" : "O"}`); await interaction.editReply({ embeds: [tttEmbed], components: [end] }); collector.stop(); return }
		await interaction.editReply({ embeds: [tttEmbed], components: [row1, row2, row3] });
	}
}