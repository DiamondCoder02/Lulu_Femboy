const config = require('../config.json');
const fs = require('fs');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        const Guilds = client.guilds.cache.map(guild => guild.name);
		console.log(` -- Ready! \n -- Logged in as ${client.user.tag}`
            + "\n\t -- Language: " + config.language
            + "\n\t -- Ready at: " + client.readyAt
            + "\n\t -- Guilds: "+ Guilds)
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
        console.log("Commands: ", commandFiles)
        console.log("Event: ", eventFiles)
        client.user.setActivity("(ノ｀Д)ノ Testing slash commands")
	}
}