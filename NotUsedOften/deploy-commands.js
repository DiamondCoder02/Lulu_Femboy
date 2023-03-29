const fs = require("fs"), { REST } = require("@discordjs/rest"), { Routes } = require("discord-api-types/v9");
const wait = require("node:timers/promises").setTimeout;
const commands = [], commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
require("dotenv").config();
let token = process.env.token, ClientID =process.env.ClientID, GuildID =process.env.GuildID;
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
console.clear();
const rest = new REST({ version: "9" }).setToken(token);
// Ask user for number input from console (github copilot)
const ask = (question, callback) => {
	const readline = require("readline");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question("Please choose a number between 1 and 5: \n1.Register new command only in the specific guild. \n2.Register command on all servers( might take an hour to appear). \n3.Delete all commands only in the specific guild. \n4.Delete commands on all servers( might take an hour to work). \n5.Exit. \n\n6.Secret Global Commands reload. Please wait... \n7.Secret Guild Commands reload. Please wait... \nNumber: ", (answer) => {
		rl.close();
		callback(answer);
	});
};
// Ask user for a number between 1 and 5 and execute the corresponding function
ask("Ask number 1-5", (answer) => {
	if (answer == 1) {
		rest.put(Routes.applicationGuildCommands(ClientID, GuildID), { body: commands })
			.then(() => console.log("Registered all commands in the specific guild => "+GuildID))
			.catch(console.error);
		console.log(commands);
	} else if (answer == 2) {
		rest.put(Routes.applicationCommands(ClientID), { body: commands })
			.then(() => console.log("Registered all commands globally"))
			.catch(console.error);
		console.log(commands);
	} else if (answer == 3) {
		rest.get(Routes.applicationGuildCommands(ClientID, GuildID))
			.then(data => {
				const promises = [];
				for (const command of data) {
					const deleteUrl = `${Routes.applicationGuildCommands(ClientID, GuildID)}/${command.id}`;
					promises.push(rest.delete(deleteUrl));
				}
				Promise.all(promises).then(() => console.log("Deleted all commands in the specific guild => "+GuildID)).catch(console.error);
			})
			.catch(console.error);
	} else if (answer == 4) {
		rest.get(Routes.applicationCommands(ClientID))
			.then(data => {
				const promises = [];
				for (const command of data) {
					const deleteUrl = `${Routes.applicationCommands(ClientID)}/${command.id}`;
					promises.push(rest.delete(deleteUrl));
				}
				Promise.all(promises).then(() => console.log("Deleted all commands globally")).catch(console.error);
			})
			.catch(console.error);
	} else if (answer == 5) {
		console.log("You have chosen to exit the program. Goodbye!");
	} else if (answer == 6) {
		console.log("Secret Global Commands reload. Please wait...");
		rest.get(Routes.applicationCommands(ClientID))
			.then(data => {
				const promises = [];
				for (const command of data) {
					const deleteUrl = `${Routes.applicationCommands(ClientID)}/${command.id}`;
					promises.push(rest.delete(deleteUrl));
				}
				Promise.all(promises).then(() => console.log("Deleted all commands globally")).catch(console.error);
			}).then(
				rest.put(Routes.applicationCommands(ClientID), { body: commands })
					.then(() => console.log("Registered all commands globally"))
					.catch(console.error)
			)
			.catch(console.error);
	} else if (answer == 7) {
		console.log("Secret Guild Commands reload. Please wait...");
		rest.get(Routes.applicationGuildCommands(ClientID, GuildID))
			.then(data => {
				const promises = [];
				for (const command of data) {
					const deleteUrl = `${Routes.applicationGuildCommands(ClientID, GuildID)}/${command.id}`;
					promises.push(rest.delete(deleteUrl));
				}
				Promise.all(promises).then(() => console.log("Deleted all commands in the specific guild => "+GuildID)).catch(console.error);
			}).then(
				rest.put(Routes.applicationCommands(ClientID), { body: commands })
					.then(() => console.log("Registered all commands globally"))
					.catch(console.error)
			).catch(console.error);
	} else {
		console.log("Error: Please restart the program and enter a number between 1 and 5");
	}
	return wait(3000);
});