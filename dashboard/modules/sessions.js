const { oauth } = require("./auth-client.js");
const { client } = require("../../index.js");

const sessions = new Map();

function get(key) {
	return sessions.get(key) ?? create(key);
}

async function create(key) {
	setTimeout(() => sessions.delete(key), 5 * 60 * 1000);
	// await update(key);

	return sessions.get(key);
}

async function update(key) {
	return sessions
		.set(key, {
			authUser: await oauth.getUser(key),
			guilds: getManageableGuilds(await oauth.getGuilds(key))
		});
}

function getManageableGuilds(authGuilds) {
	const guilds = [];
	for (const id of authGuilds.keys()) {
		const isManager = authGuilds
			.get(id).permissions
			.includes("MANAGE_GUILD");
		const guild = client.guilds.cache.get(id);
		if (!guild || !isManager) { continue }

		guilds.push(guild);
	}
	return guilds;
}

module.exports.get = get;
module.exports.update = update;