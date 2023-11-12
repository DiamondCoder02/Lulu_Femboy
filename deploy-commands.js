/* eslint-disable no-console */
const { REST } = require("@discordjs/rest"), { Routes } = require("discord-api-types/v9");
const wait = require("node:timers/promises").setTimeout;
require("dotenv").config();
let cId = process.env.ClientID;
console.clear();

module.exports = {
	execute(client, token, forDeploy) {
		const rest = new REST({ version: "9" }).setToken(token);
		// Ask user for a number between 1 and 4 and execute the corresponding function
		const ask = (question, callback) => {
			const readline = require("readline");
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
			rl.question("Please choose a number between 1 and 4: \n1. Register command on all servers. \n2. Delete commands on all servers. \n3. Global Commands reload. \n4. Continue...", (answer) => {
				rl.close();
				callback(answer);
			});
		};
		ask("Ask number 1-5", (answer) => {
			switch (answer) {
			case "1": {
				rest.put(Routes.applicationCommands(cId), { body: forDeploy })
					.then(() => console.log("Registered all commands globally"))
					.catch(console.error);
				break;
			}
			case "2": {
				rest.get(Routes.applicationCommands(cId))
					.then(data => {
						const promises = [];
						for (const command of data) {
							const deleteUrl = `${Routes.applicationCommands(cId)}/${command.id}`;
							promises.push(rest.delete(deleteUrl));
						}
						Promise.all(promises).then(() => console.log("Deleted all commands globally")).catch(console.error);
					})
					.catch(console.error);
				break;
			}
			case "3": {
				console.log("Global Commands reload. Please wait...");
				rest.get(Routes.applicationCommands(cId))
					.then(data => {
						const promises = [];
						for (const command of data) {
							const deleteUrl = `${Routes.applicationCommands(cId)}/${command.id}`;
							promises.push(rest.delete(deleteUrl));
						}
						Promise.all(promises).then(() => console.log("Deleted all commands globally")).catch(console.error);
					}).then(
						rest.put(Routes.applicationCommands(cId), { body: forDeploy })
							.then(() => console.log("Registered all commands globally"))
							.catch(console.error)
					)
					.catch(console.error);
				break;
			}
			default: {
				console.log("Continuing without modifing commands.");
				break;
			}
			}
			client.login(token);
			return wait(2000);
		});
	}
};
