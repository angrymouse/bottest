const { Deta } = require("deta");
const app = require("fastify")();
const path = require("path");
const AutoLoad = require("fastify-autoload");

const util = require("./util");
// const { default: axios } = require("axios");
global.actions = require("./actions.js");
global.opts = {};
global.commands = new Map();

// Place here your custom code!

// Do not touch the following lines

// This loads all plugins defined in plugins
// those should be support plugins that are reused
// through your application

let { default: axios } = require("axios");
global.dsApi = axios.create({
	baseURL: "https://discord.com/api/v9/",
	headers: {
		Authorization: "Bot " + process.env.TOKEN,
	},
});
app.register(AutoLoad, {
	dir: path.join(__dirname, "plugins"),
	options: {},
});
app.register(AutoLoad, {
	dir: path.join(__dirname, "routes"),
	options: Object.assign({}, opts),
});

// This loads all plugins defined in routes
// define your routes in one of these

global.deta = Deta(process.env.DETAKEY);

// if (process.env.DEVELOPMENT) {
// 	util("loadCommands")(
// 		path.join(__dirname, "dev_commands"),
// 		process.env.DEV_GUILD
// 	);
// }

// fastify.listen(3000);

// app.listen(3000);
module.exports = app;
