const sessions = require("./sessions");

module.exports.updateUser = async (req, res, next) => {
	try {
		const key = res.cookies.get("access_token");
		if (key) {
			const { authUser } = await sessions.get(key);
			res.locals.user = authUser;
		}
	} finally {
		next();
	}
};