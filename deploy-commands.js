const fs = require('fs'), { REST } = require('@discordjs/rest'), { Routes } = require('discord-api-types/v9'), { guildId, clientId, Token, language } = require('./config.json'), lang = require('./languages/' + language + '.json');
const commands = [], commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('dotenv').config();
var token = process.env.token, cId =process.env.cId, gId =process.env.gId;
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON())
}
try { if (Token !== "token") var t = Token; else var t = token} catch {console.log(lang.deploy.token)}
try { if (clientId !== "clientID") var c = clientId; else var c = cId} catch {console.log(lang.deploy.clientId)}
try { if (guildId !== "guildID") var g = guildId; else var g = gId} catch {console.log("guildId missing")}
const rest = new REST({ version: '9' }).setToken(t);

/*
rest.put(Routes.applicationCommands(c), { body: commands })
	.then(() => console.log(lang.deploy.success))
	.catch(console.error);
*/


rest.put(Routes.applicationGuildCommands(c, g), { body: commands })
	.then(() => console.log(lang.deploy.success))
	.catch(console.error);
console.log(commands)


/*
rest.get(Routes.applicationGuildCommands(c, g))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(c, g)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
});
*/

/*
rest.get(Routes.applicationCommands(c))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationCommands(c)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
});
*/
