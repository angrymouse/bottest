module.exports = function (name, ...args) {
	let path = require("path");
	let initialArgs = args;
	return async (...args) => {
		return await require(path.join(__dirname, "util", name))(
			...initialArgs,
			...args
		);
	};
};
