module.exports = async () => {
	let crypto = require("crypto");
	return crypto.randomBytes(16).toString("hex");
};
