module.exports = function (app, opts, next) {
	app.post("/interactions/", async (req, res) => {
		const nacl = require("tweetnacl");
		// let fetch = await import("node-fetch");
		let signature = req.headers["x-signature-ed25519"];
		let timestamp = req.headers["x-signature-timestamp"];

		let isVerified = nacl.sign.detached.verify(
			Buffer.from(timestamp.toString() + req.rawBody.toString()),
			Buffer.from(signature, "hex"),
			Buffer.from(process.env.PUBLIC_KEY, "hex")
		);
		if (!isVerified) {
			return res.code(401).send("invalid request signature");
		}
		console.log(
			"[INTERACTION CORE] Interaction received, type: " + req.body.type
		);
		let handlers = {
			1: async () => {
				return { type: 1 };
			},
			2: async () => {
				return await actions("command", req.body)(res);
			},
			3: async () => {
				let query = req.body.data.custom_id.split(":");

				return await actions(...query.slice(1))(req.body);
			},
		}[req.body.type];
		let result = await handlers();
		res.send(result);
	});
	if (typeof next !== "undefined" && next) next();
};
