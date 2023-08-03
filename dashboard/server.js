const express = require("express");
const cookies = require("cookies");

const middleware = require("./modules/middleware");
const authRoutes = require("./routes/auth-routes");
const rootRoutes = require("./routes/root-routes");
// const dashboardRoutes = require("./routes/dashboard-routes");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(cookies.express("a", "b", "c"));

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.use("/",
	middleware.updateUser,
	rootRoutes,
	authRoutes,
	// middleware.validateUser, middleware.updateGuilds, dashboardRoutes
);

app.all("*", (req, res) => res.render("errors/404", {
	botName: "Lulu",
	subtitle: "error"
}));

const port = process.env.serverPort ||3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));