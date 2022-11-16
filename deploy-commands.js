const fs = require('fs'), { REST } = require('@discordjs/rest'), { Routes } = require('discord-api-types/v9'), { guildId, clientId, Token } = require('./botConfigs/config.json');
const wait = require('node:timers/promises').setTimeout;
const commands = [], commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('dotenv').config();
var token = process.env.token, cId =process.env.cId, gId =process.env.gId;
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON())
}
console.clear();
try { if (Token !== "token") var t = Token; else var t = token} catch {console.log("Please provide a bot token.")}
try { if (clientId !== "clientID") var c = clientId; else var c = cId} catch {console.log("Please provide a ClientID.")}
const rest = new REST({ version: '9' }).setToken(t);
//ask user for number input from console (github copilot)
const ask = (question, callback) => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Please choose a number between 1 and 5: \n1.Register new command only in the specific guild. \n2.Register command on all servers( might take an hour to appear). \n3.Delete all commands only in the specific guild. \n4.Delete commands on all servers( might take an hour to work). \n5.Exit. \nNumber: ", (answer) => {
        rl.close();
        callback(answer);
    });
};
//ask user for a number between 1 and 5 and execute the corresponding function
ask("Ask number 1-5", (answer) => {
    if (answer == 1) {
        try { if (guildId !== "guildID") var g = guildId; else var g = gId} catch {console.log("Please provide a GuildID.")}
        rest.put(Routes.applicationGuildCommands(c, g), { body: commands })
        .then(() => console.log("Registered all commands in the specific guild => "+g))
        .catch(console.error);
        console.log(commands)
    } else if (answer == 2) {
        rest.put(Routes.applicationCommands(c), { body: commands })
        .then(() => console.log("Registered all commands globally"))
        .catch(console.error);
        console.log(commands)
    } else if (answer == 3) {
        try { if (guildId !== "guildID") var g = guildId; else var g = gId} catch {console.log("Please provide a GuildID.")}
        rest.get(Routes.applicationGuildCommands(c, g))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(c, g)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            Promise.all(promises).then(() => console.log("Deleted all commands in the specific guild => "+g)).catch(console.error);
        })
        .catch(console.error);
    } else if (answer == 4) {
        rest.get(Routes.applicationCommands(c))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationCommands(c)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            Promise.all(promises).then(() => console.log("Deleted all commands globally")).catch(console.error);
        })
        .catch(console.error);
    } else if (answer == 5) {
        console.log("You have chosen to exit the program. Goodbye!");
    } else if (answer == 6) {
        console.log("Secret Global Commands reload. Please wait...");
        rest.get(Routes.applicationCommands(c))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationCommands(c)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            Promise.all(promises).then(() => console.log("Deleted all commands globally")).catch(console.error);
        }).then(
            rest.put(Routes.applicationCommands(c), { body: commands })
            .then(() => console.log("Registered all commands globally"))
            .catch(console.error)
        )
        .catch(console.error);
    } else if (answer == 7) {
        console.log("Secret Guild Commands reload. Please wait...");
        try { if (guildId !== "guildID") var g = guildId; else var g = gId} catch {console.log("Please provide a GuildID.")}
        rest.get(Routes.applicationGuildCommands(c, g))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(c, g)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            Promise.all(promises).then(() => console.log("Deleted all commands in the specific guild => "+g)).catch(console.error);
        }).then(
            rest.put(Routes.applicationCommands(c), { body: commands })
            .then(() => console.log("Registered all commands globally"))
            .catch(console.error)
        ).catch(console.error);
    } else {
        console.log("Error: Please restart the program and enter a number between 1 and 5");
    }
    return wait(3000)
});