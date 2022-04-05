const fs = require('fs'), { REST } = require('@discordjs/rest'), { Routes } = require('discord-api-types/v9'), { guildId, clientId, Token, language } = require('./config.json'), lang = require('./languages/' + language + '.json');
const e = lang.deploy.error.split('-'), a = lang.deploy.answer.split('-'), q = lang.deploy.question.split('-')
const commands = [], commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('dotenv').config();
var token = process.env.token, cId =process.env.cId, gId =process.env.gId;
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON())
}
console.clear();
try { if (Token !== "token") var t = Token; else var t = token} catch {console.log(e[0])}
try { if (clientId !== "clientID") var c = clientId; else var c = cId} catch {console.log(e[1])}
const rest = new REST({ version: '9' }).setToken(t);
//ask user for number input from console (github copilot)
const ask = (question, callback) => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(q[0] + "\n1." + q[1] + "\n2." + q[2] + "\n3." + q[3] + "\n4." + q[4] + "\n5." + q[5] + "\n", (answer) => {
        rl.close();
        callback(answer);
    });
};
//ask user for a number between 1 and 5 and execute the corresponding function
ask(lang.deploy.question, (answer) => {
    if (answer == 1) {
        try { if (guildId !== "guildID") var g = guildId; else var g = gId} catch {console.log(e[2])}
        rest.put(Routes.applicationGuildCommands(c, g), { body: commands })
        .then(() => console.log(a[0]))
        .catch(console.error);
        console.log(commands)
    } else if (answer == 2) {
        rest.put(Routes.applicationCommands(c), { body: commands })
        .then(() => console.log(a[1]))
        .catch(console.error);
        console.log(commands)
    } else if (answer == 3) {
        try { if (guildId !== "guildID") var g = guildId; else var g = gId} catch {console.log(e[2])}
        rest.get(Routes.applicationGuildCommands(c, g))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(c, g)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises).then(() => console.log(a[2]));
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
            return Promise.all(promises).then(() => console.log(a[3]));
        })
        .catch(console.error);
    } else if (answer == 5) {
        return console.log(a[4]);
    } else {
        console.log(e[3]);
    }
});