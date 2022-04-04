const fs = require('fs'), { REST } = require('@discordjs/rest'), { Routes } = require('discord-api-types/v9'), { guildId, clientId, Token, language } = require('./config.json'), lang = require('./languages/' + language + '.json');
const commands = [], commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('dotenv').config();
var token = process.env.token, cId =process.env.cId, gId =process.env.gId;
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON())
}
console.clear();
try { if (Token !== "token") var t = Token; else var t = token} catch {console.log(lang.deploy.token)}
try { if (clientId !== "clientID") var c = clientId; else var c = cId} catch {console.log(lang.deploy.clientId)}
try { if (guildId !== "guildID") var g = guildId; else var g = gId} catch {console.log("guildId missing")}
const rest = new REST({ version: '9' }).setToken(t);

//ask user for number input from console (github copilot)
const ask = (question, callback) => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Please choose a number between 1 and 5: \n1. Register new command only in the specific guild. \n2. Register command on all servers( might take an hour to appear). \n3. Delete slash commands only in the specific guild.\n4. Delete commands on all servers( might take an hour to work).\n5. Exit.\n", (answer) => {
        rl.close();
        callback(answer);
    });
};
//ask user for a number between 1 and 4 and execute the corresponding function
ask(lang.deploy.question, (answer) => {
    if (answer == 1) {
        rest.put(Routes.applicationGuildCommands(c, g), { body: commands })
        .then(() => console.log(lang.deploy.success))
        .catch(console.error);
        console.log(commands)
    } else if (answer == 2) {
        rest.put(Routes.applicationCommands(c), { body: commands })
        .then(() => console.log("Reguistered all commands globally"))
        .catch(console.error);
        console.log(commands)
    } else if (answer == 3) {
        rest.get(Routes.applicationGuildCommands(c, g))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(c, g)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises).then(() => console.log("Deleted all commands in the specific guild"));
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
            return Promise.all(promises).then(() => console.log("Deleted all commands globally"));
        })
        .catch(console.error);
    } else if (answer == 5) {
        return console.log("You have chosen to exit the program. Goodbye!");
    } else {
        console.log("Error: Please restart the program and enter a number between 1 and 5");
    }
});