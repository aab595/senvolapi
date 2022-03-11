const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
	const savedUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString(),
	});
	try {
		const user = await savedUser.save();
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

// LOGIN
router.post("/login", async (req, res) => {
	try {
		const findUser = await User.findOne({ username: req.body.username });
		if (!findUser) {
			res.status(404).json({ message: "User Not Found!" });
		} else {
			// DECRYPT PASSWORD
			const hashedPasswordDecrypted = CryptoJS.AES.decrypt(
				findUser.password,
				process.env.PASS_SEC
			);
			const originalPassword = hashedPasswordDecrypted.toString(
				CryptoJS.enc.Utf8
			);
			// COMPARE PASSWORDS
			if (originalPassword === req.body.password) {
				// CREATE A TOKEN
				const accessToken = jwt.sign(
					{
						id: findUser._id,
						isAdmin: findUser.isAdmin,
					},
					process.env.JWT_SEC,
					{ expiresIn: "24h" }
				);
				// HOOK FOR NONE DISPLAY PASSWORD
				const { password, ...others } = findUser._doc;
				res.status(200).json({
					message: "LogIn Successfully!",
					...others,
					accessToken,
				});
			} else {
				res.status(409).json({ message: "Wrong Credentials" });
			}
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
