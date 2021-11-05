module.exports = async (interaction, pollId, variantId) => {
	let polls = deta.Base("polls");
	let _ = require("lodash");
	let poll = await polls.get(pollId);
	poll.variants = poll.variants.map((v) => ({
		...v,
		supported: v.supported.filter((u) => u != interaction.member.user.id),
	}));
	poll.variants[
		poll.variants.findIndex((v) => v.variantId == variantId)
	].supported.push(interaction.member.user.id);

	let buttons = _.chunk(poll.variants, 5).map((variantChunk) => {
		return {
			type: 1,
			components: variantChunk.map((variant) => {
				return {
					type: 2,
					label: `${variant.title} (${variant.supported.length} people)`,
					style: 1,
					custom_id: [Date.now(), "vote", pollId, variant.variantId].join(":"),
				};
			}),
		};
	});
	// console.log(buttons[0]);
	await polls.put(poll);
	return {
		type: 7,
		data: {
			components: buttons,
		},
	};
};
