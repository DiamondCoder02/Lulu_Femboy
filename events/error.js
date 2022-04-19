const {debug_level} = require('../config.json')
module.exports = {
	name: 'error',
	execute(client) {
		client.on("error", console.error)
		client.on("warn", console.warn)
		if (debug_level >= 3) {
			client.on("debug", console.log)
		}
	}
};