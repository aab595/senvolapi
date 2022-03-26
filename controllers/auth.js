const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				fullname: req.body.fullname,
				email: req.body.email,
				password: hash,
			});
			user.save()
				.then(() =>
					res.status(201).json({ message: "Utilisateur créé !" })
				)
				.catch((error) =>
					res.status(400).json({ error: error.message })
				);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res
							.status(401)
							.json({ error: "Mot de passe incorrect !" });
					}

					const token = jwt.sign(
						{
							id: user._id,
							isAdmin: user.isAdmin,
						},
						process.env.JWT_SEC_KEY,
						{ expiresIn: process.env.JWT_EXPIRE_TIME }
					);

					const { password, ...others } = user._doc;
					res.status(200).json({
						...others,
						token,
					});
				})
				.catch((error) =>
					res.status(500).json({ error: error.message })
				);
		})
		.catch((error) => res.status(500).json({ error }));
};
