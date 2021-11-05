module.exports = async (interaction, clicks) => {
	clicks = parseInt(clicks);
	return {
		type: 7,
		data: {
			content: "Клацай по кнопке чтоб бить рекорды по кликанью!",
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: `${clicks}`,
							style: 1,
							custom_id: [Date.now(), "clicker", clicks + 1].join(":"),
						},
					],
				},
			],
		},
	};
};
