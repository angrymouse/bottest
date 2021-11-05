const { MessageEmbed } = require("discord.js");

exports.options = [
	{
		type: 3,
		name: "pog",
		required: false,
		choices: [],
		description: "pog?",
	},
];
exports.run = async (interaction) => {
	return {
		content: "Discord bot can be hosted on serverless platform!",
	};

	// console.log(interaction);
};
