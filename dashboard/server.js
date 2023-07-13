const express = require("express");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.get("/lulu", (req, res) => { res.render("main", {
	botName: "Lulu",
	message: "Lulu is a good girl!",
	subtitle: "main page"
});});

app.all("*", (req, res) => res.render("errors/404"));

const port = process.env.serverPort ||3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));