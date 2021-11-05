module.exports = async (response, request) => {
	let command = require("../dev_commands/" + request.data.name + ".js");
	request.data.options = request.data.options || [];
	request.data.rawOptions = request.data.options;
	request.data.options = request.data.options.reduce(
		(pv, cv) => ({ ...pv, [cv.name]: cv.value }),
		{}
	);

	return { type: 4, data: await command.run(request) };
};
