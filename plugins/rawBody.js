const fp = require("fastify-plugin");

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */

module.exports = fp(async function (fastify, opts, next) {
	fastify.register(require("fastify-raw-body"), {
		field: "rawBody", // change the default request.rawBody property name
		encoding: "utf8", // set it to false to set rawBody as a Buffer **Default utf8**
		runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
	});
	if (typeof next !== "undefined" && next) next();
});
