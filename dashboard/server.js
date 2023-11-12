const express = require("express");
const port = process.env.serverPort ||3000;

const app = express();

app.get("/lulu", (request, response) => {
	return response.sendFile("/html/index.html", { root: "./dashboard" });
});

app.get("/lulu/teapot", (request, response) => {
	return response.sendFile("/html/errors/418.html", { root: "./dashboard" });
});

app.get("*", (request, response) => {
	return response.sendFile("/html/errors/404.html", { root: "./dashboard" });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));