const config = require('../config.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        const Guilds = client.guilds.cache.map(guild => guild.name);
		console.log(` -- Ready! \n -- Logged in as ${client.user.tag}`
            + "\n\t -- Language: " + config.language
            + "\n\t -- Ready at: " + client.readyAt
            + "\n\t -- Guilds: "+ Guilds)
        client.user.setActivity("(^///^) Testing slash commands")
	}
}