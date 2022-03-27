const Flight = require("../models/Flight");

exports.getAllFlight = (req, res, next) => {
	Flight.find()
		.then((flights) => res.status(200).json(flights))
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneFlight = (req, res, next) => {
	Flight.findOne({ _id: req.params.id })
		.then((flight) => res.status(200).json(flight))
		.catch((error) => res.status(404).json({ error }));
};

exports.createFlight = (req, res, next) => {
	delete req.body._id;
	const flight = new Flight({
		...req.body,
	});
	flight
		.save()
		.then(() => res.status(201).json({ message: "Vol ajouté !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.modifyFlight = (req, res, next) => {
	Flight.updateOne(
		{ _id: req.params.id },
		{ ...req.body, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: "Vol modifié !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteFlight = (req, res, next) => {
	Flight.findOne({ _id: req.params.id }).then((flight) => {
		if (!flight) {
			res.status(404).json({
				error: new Error("Pas de vols !"),
			});
		}
		if (flight.userId !== req.auth.userId) {
			res.status(400).json({
				error: new Error("Demande non autorisée !"),
			});
		}
		Flight.deleteOne({ _id: req.params.id })
			.then(() => {
				res.status(200).json({
					message: "Vol supprimée !",
				});
			})
			.catch((error) => {
				res.status(400).json({
					error: error,
				});
			});
	});
};
