const express = require("express");
const { webCommand } = require("../../index.js");

const router = express.Router();

router.get("/lulu", (req, res) => res.render("main", {
	botName: "Lulu",
	message: "Lulu is a good girl!",
	subtitle: "main page"
}));

router.get("/lulu/commands", (req, res) => res.render("pages/commands", {
	botName: "Lulu",
	subtitle: "commands",
	categories: [
		// Todo - Add pics and icons
		{ name: "Games", icon: "fas fa-gamepad" },
		{ name: "Images", icon: "fas fa-hammer" },
		{ name: "Misc", icon: "fas fa-tools" },
		{ name: "Moderation", icon: "fas fa-shield-alt" }
	],
	commands: Array.from(webCommand.values()),
	commandsString: JSON.stringify(Array.from(webCommand.values()))
}));

router.get("/lulu/teapot", (req, res) => res.render("errors/418", {
	botName: "Lulu",
	subtitle: "teapot"
}));

router.get("/lulu/dashboard", (req, res) => res.render("pages/dashboard", {
	botName: "Lulu",
	subtitle: "dashboard"
}));

module.exports = router;