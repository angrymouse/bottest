const path = require("path");

module.exports = async (dir, guild = null) => {
	const fs = require("fs");
	let cmds = [];

	fs.readdirSync(dir).forEach((commandFile) => {
		console.log(guild);
		if (fs.lstatSync(path.join(dir, commandFile)).isDirectory()) {
			let commandName = commandFile.split("/")[0];
			let subCommands = fs
				.readdirSync(path.join(dir, commandFile))
				.filter((f) => f.endsWith(".js"))
				.map((subcommandFile) => {
					let subcommandModule = require(path.join(
						dir,
						commandFile,
						subcommandFile
					));
					let subcommandName = subcommandFile.split(".").slice(0, -1).join("");
					return {
						name: subcommandName,
						options: [],
						description: "Description Placeholder",
						default_permission: true,
						...subcommandModule,
					};
				});
			console.log(cmds);
			cmds.push({
				description: fs.existsSync(
					fs.existsSync(path.join(dir, commandFile, "description.txt"))
						? fs.readFileSync(path.join(dir, commandFile, "description.txt"))
						: "Description placehiolder"
				),
				name: commandName,
				type: 2,
				options: subCommands.map((s) => ({
					type: 1,
					name: s.name,
					options: s.options,
					default_permission: s.default_permission,
					description: s.description,
				})),
			});
		} else {
			let commandModule = require(path.join(dir, commandFile));
			let commandName = commandFile.split(".").slice(0, -1).join("");
			cmds.push({
				description: "Description placeholder",
				async run() {},
				name: commandName,
				default_permission: true,
				options: [],
				type: 1,
				...commandModule,
			});
		}
	});
	if (guild) {
		console.log(
			cmds.map((cmd) => {
				return {
					name: cmd.name,
					description: cmd.description,
					default_permission: cmd.default_permission,
					options: cmd.options,
					// type: cmd.type,
				};
			})
		);
		try {
			(
				await dsApi.put(
					`/applications/${process.env.BOT_ID}/guilds/${guild}/commands`,

					cmds.map((cmd) => {
						return {
							name: cmd.name,
							description: cmd.description,
							default_permission: cmd.default_permission,
							options: cmd.options,
							// type: cmd.type,
						};
					})
				)
			).data;
		} catch (error) {
			// console.log(error, error.response);
			console.error(error);
		} finally {
		}
	}
};
