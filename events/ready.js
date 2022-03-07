const config = require('../config.json');
const fs = require('fs');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        client.user.setActivity("(ノ｀Д)ノ Testing slash commands")
        console.log(client)
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
        console.log(eventFiles)
        const Guilds = client.guilds.cache.map(guild => guild.name);
		console.log(` -- Ready! \n -- Logged in as ${client.user.tag}`
            + "\n\t -- Language: " + config.language
            + "\n\t -- ClientID: " + config.clientId
            + "\n\t -- Password: " + config.stopPassword
            + "\n\t -- Ready at: " + client.readyAt
            + "\n\t -- Guilds: "+ Guilds)
	}
}