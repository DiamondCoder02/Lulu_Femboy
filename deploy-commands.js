const { REST } = require("@discordjs/rest"), { Routes } = require("discord-api-types/v9");
const wait = require("node:timers/promises").setTimeout;
require("dotenv").config();
let GuildID =process.env.GuildID;
console.clear();

module.exports = {
	execute(client, token, forDeploy) {
		const rest = new REST({ version: "9" }).setToken(token);
		// Ask user for a number between 1 and 5 and execute the corresponding function
		const ask = (question, callback) => {
			const readline = require("readline");
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
			rl.question("Please choose a number between 1 and 7: \n1.Register new command only in the specific guild. \n2.Register command on all servers( might take an hour to appear). \n3.Delete all commands only in the specific guild. \n4.Delete commands on all servers( might take an hour to work). \n5.Exit. \n\n6.Secret Global Commands reload. \n7.Secret Guild Commands reload. \nNumber: ", (answer) => {
				rl.close();
				callback(answer);
			});
		};
		ask("Ask number 1-5", (answer) => {
			if (answer == 1) {
				rest.put(Routes.applicationGuildCommands(client.user.id, GuildID), { body: forDeploy })
					.then(() => console.log("Registered all commands in the specific guild => "+GuildID))
					.catch(console.error);
			} else if (answer == 2) {
				rest.put(Routes.applicationCommands(client.user.id), { body: forDeploy })
					.then(() => console.log("Registered all commands globally"))
					.catch(console.error);
			} else if (answer == 3) {
				rest.get(Routes.applicationGuildCommands(client.user.id, GuildID))
					.then(data => {
						const promises = [];
						for (const command of data) {
							const deleteUrl = `${Routes.applicationGuildCommands(client.user.id, GuildID)}/${command.id}`;
							promises.push(rest.delete(deleteUrl));
						}
						Promise.all(promises).then(() => console.log("Deleted all commands in the specific guild => "+GuildID)).catch(console.error);
					})
					.catch(console.error);
			} else if (answer == 4) {
				rest.get(Routes.applicationCommands(client.user.id))
					.then(data => {
						const promises = [];
						for (const command of data) {
							const deleteUrl = `${Routes.applicationCommands(client.user.id)}/${command.id}`;
							promises.push(rest.delete(deleteUrl));
						}
						Promise.all(promises).then(() => console.log("Deleted all commands globally")).catch(console.error);
					})
					.catch(console.error);
			} else if (answer == 5) {
				console.log("You have chosen to exit the program. Goodbye!");
			} else if (answer == 6) {
				console.log("Secret Global Commands reload. Please wait...");
				rest.get(Routes.applicationCommands(client.user.id))
					.then(data => {
						const promises = [];
						for (const command of data) {
							const deleteUrl = `${Routes.applicationCommands(client.user.id)}/${command.id}`;
							promises.push(rest.delete(deleteUrl));
						}
						Promise.all(promises).then(() => console.log("Deleted all commands globally")).catch(console.error);
					}).then(
						rest.put(Routes.applicationCommands(client.user.id), { body: forDeploy })
							.then(() => console.log("Registered all commands globally"))
							.catch(console.error)
					)
					.catch(console.error);
			} else if (answer == 7) {
				console.log("Secret Guild Commands reload. Please wait...");
				rest.get(Routes.applicationGuildCommands(client.user.id, GuildID))
					.then(data => {
						const promises = [];
						for (const command of data) {
							const deleteUrl = `${Routes.applicationGuildCommands(client.user.id, GuildID)}/${command.id}`;
							promises.push(rest.delete(deleteUrl));
						}
						Promise.all(promises).then(() => console.log("Deleted all commands in the specific guild => "+GuildID)).catch(console.error);
					}).then(
						rest.put(Routes.applicationCommands(client.user.id), { body: forDeploy })
							.then(() => console.log("Registered all commands globally"))
							.catch(console.error)
					).catch(console.error);
			} else {
				console.log("Error: Please restart the program and enter a number between 1 and 5");
			}
			client.login(token);
			return wait(3000);
		});
	}
};
