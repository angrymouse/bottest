const util = require("./util");
const fs = require("fs");
const path = require("path");
let { default: axios } = require("axios");
global.dsApi = axios.create({
	baseURL: "https://discord.com/api/v9/",
	headers: {
		Authorization: "Bot " + process.env.TOKEN,
	},
});

util("loadCommands")(
	path.join(__dirname, "dev_commands"),
	process.env.DEV_GUILD
);
