const { MessageEmbed } = require("discord.js");

exports.options = [
	{
		type: 3,
		name: "code",
		required: true,
		choices: [],
		description: "Code to execute",
	},
];
exports.run = async (interaction) => {
	if (!process.env.ADMINS.includes(interaction.member.user.id)) {
		return {
			content:
				"Такое могут использовать лишь наивысшие архимаги, хранители ключа жизни бота",
		};
	}
	let embed = new MessageEmbed();
	try {
		embed.setDescription(eval(interaction.data.options.code));
		embed.setColor("GREEN");
	} catch (error) {
		embed.setDescription(error);
		embed.setColor("RED");
	} finally {
		return {
			content:
				"Вот что я получил после выполнения ``" +
				interaction.data.options.code +
				"`` :",
			embeds: [embed.toJSON()],
		};
	}

	// console.log(interaction);
};
