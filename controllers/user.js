const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.getAllUser = (req, res, next) => {
	User.find()
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
	User.findOne({ _id: req.params.id })
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(404).json({ error }));
};

exports.modifyUser = (req, res, next) => {
	if (req.body.password) {
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) => {
				User.updateOne(
					{ _id: req.params.id },
					{ ...req.body, _id: req.params.id, password: hash }
				)
					.then(() =>
						res
							.status(200)
							.json({ message: "Utilisateur modifié !" })
					)
					.catch((error) => res.status(400).json({ error }));
			})
			.catch((error) => res.json({ error }));
	} else {
		User.updateOne(
			{ _id: req.params.id },
			{ ...req.body, _id: req.params.id }
		)
			.then(() =>
				res.status(200).json({ message: "Utilisateur modifié !" })
			)
			.catch((error) => res.status(400).json({ error }));
	}
};

exports.deleteUser = (req, res, next) => {
	User.deleteOne({ _id: req.params.id })
		.then(() => {
			res.status(200).json({
				message: "Utilisateur supprimée !",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};
