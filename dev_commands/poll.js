const util = require("../util");

exports.options = [
	{
		type: 3,
		name: "title",
		required: true,
		description: "Title of the poll",
	},
	{
		type: 3,
		name: "variant-1",
		required: true,
		description: "1 Variant",
	},
	{
		type: 3,
		name: "variant-2",
		required: true,
		description: "2 Variant",
	},
	...new Array(22).fill(null).map((_null, index) => {
		index = index + 3;
		return {
			type: 3,
			name: "variant-" + index,
			required: false,
			description: index + " Variant",
		};
	}),
];
exports.run = async (interaction) => {
	let _ = require("lodash");
	let idMake = util("id");
	let variants = await Promise.all(
		interaction.data.rawOptions
			.filter((option) => {
				return option.name.startsWith("variant");
			})
			.map(async (v) => {
				return {
					variantId: (await idMake()).toString(),
					name: v.name,
					supported: [],
					title: v.value,
					index: parseInt(v.name.split("-")[1]),
				};
			})
	);
	// console.log(variants);
	let polls = deta.Base("polls");
	let pollId = (await idMake()).toString();
	await polls.put({
		key: pollId,
		interactionId: interaction.id,
		title: interaction.data.options.title,
		variants,
	});
	let buttons = _.chunk(variants, 5).map((variantChunk) => {
		return {
			type: 1,
			components: variantChunk.map((variant) => {
				return {
					type: 2,
					label: `${variant.title} (${variant.supported.length} people)`,
					style: 2,
					custom_id: [Date.now(), "vote", pollId, variant.variantId].join(":"),
				};
			}),
		};
	});
	return {
		content: interaction.data.options.title,
		components: buttons,
		allowed_mentions: { parse: [] },
	};
};
