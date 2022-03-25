const Destination = require("../models/Destination");

exports.getAllDestination = (req, res, next) => {
	Destination.find()
		.then((destinations) => res.status(200).json({ destinations }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneDestination = (req, res, next) => {
	Destination.findOne({ _id: req.params.id })
		.then((destination) => res.status(200).json({ destination }))
		.catch((error) => res.status(404).json({ error }));
};

exports.createDestination = (req, res, next) => {
	delete req.body._id;
	const destination = new Destination({
		...req.body,
	});
	destination
		.save()
		.then(() => res.status(201).json({ message: "Destination ajouté !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.modifyDestination = (req, res, next) => {
	Destination.updateOne(
		{ _id: req.params.id },
		{ ...req.body, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: "Destination modifié" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteDestination = (req, res, next) => {
	Destination.findOne({ _id: req.params.id }).then((destination) => {
		if (!destination) {
			res.status(404).json({
				error: new Error("Pas de réservation !"),
			});
		}
		if (destination.userId !== req.auth.userId) {
			res.status(400).json({
				error: new Error("Demande non autorisée !"),
			});
		}
		Destination.deleteOne({ _id: req.params.id })
			.then(() => {
				res.status(200).json({
					message: "Destination supprimée !",
				});
			})
			.catch((error) => {
				res.status(400).json({
					error: error,
				});
			});
	});
};
