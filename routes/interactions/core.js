module.exports = function (app, opts, next) {
	if (typeof next !== "undefined" && next) next();
};
