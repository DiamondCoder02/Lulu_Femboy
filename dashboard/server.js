const express = require("express");
const { webCommand } = require("../index.js");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.get("/lulu", (req, res) => res.render("main", {
	botName: "Lulu",
	message: "Lulu is a good girl!",
	subtitle: "main page"
}));

app.get("/lulu/commands", (req, res) => res.render("pages/commands", {
	botName: "Lulu",
	subtitle: "commands",
	categories: [
		// TODO - Add pics and icons
		{ name: "Games", icon: "fas fa-gamepad" },
		{ name: "Images", icon: "fas fa-hammer" },
		{ name: "Misc", icon: "fas fa-tools" },
		{ name: "Moderation", icon: "fas fa-shield-alt" }
	],
	commands: Array.from(webCommand.values()),
	commandsString: JSON.stringify(Array.from(webCommand.values()))
}));

app.get("/lulu/teapot", (req, res) => res.render("errors/418", {
	botName: "Lulu",
	subtitle: "teapot"
}));
app.all("*", (req, res) => res.render("errors/404", {
	botName: "Lulu",
	subtitle: "error"
}));

const port = process.env.serverPort ||3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));