const util = require("../util");

exports.options = [];
exports.run = async (interaction) => {
	return {
		content: "Клацай по кнопке чтоб бить рекорды по кликанию!",
		components: [
			{
				type: 1,
				components: [
					{
						type: 2,
						label: `0`,
						style: 3,
						custom_id: [Date.now(), "clicker", 0].join(":"),
					},
				],
			},
		],
	};
};
