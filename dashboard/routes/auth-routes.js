const { generateAuthURL, tokenRequest } = require("../modules/auth-client.js");
const express = require("express");
const router = express.Router();

router.get("/lulu/login", (req, res) =>
	res.redirect(generateAuthURL)
);

router.get("/lulu/discord/auth", async (req, res) => {
	try {
		const code = req.query.code;
		const token = await tokenRequest(code);
		res.cookies.set("access_token", token);
		console.log(token);
		res.redirect("/lulu/dashboard");
	} catch (err) {
		res.render("errors/401");
	}
});

module.exports = router;