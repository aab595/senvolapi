const Reservation = require("../models/Reservation");

exports.getAllReservation = (req, res, next) => {
	Reservation.find()
		.then((reservations) => {
			if (req.user.isAdmin) {
				res.status(200).json({ status: 'success', payload: reservations, message: '' })
			} else {
				const filteredReservations = []
				reservations.forEach(reservation => {
					if (reservation.userRef == req.user.id) {
						filteredReservations.push(reservation)
					}
				})
				if (filteredReservations.length > 0) {
					res.status(200).json({ status: 'success', payload: filteredReservations, message: '' })
				} else {
					res.status(200).json({ status: 'fail', payload: [], message: "Aucune réservation n'a été enrégistrée !" })
				}
			}
		})
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneReservation = (req, res, next) => {
	Reservation.findOne({ _id: req.params.id })
		.then((reservation) => res.status(200).json(reservation))
		.catch((error) => res.status(404).json({ error }));
};

exports.createReservation = (req, res, next) => {
	delete req.body._id;
	const reservation = new Reservation({
		...req.body,
	});
	reservation
		.save()
		.then(() => res.status(201).json({ message: "Reservation ajouté !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.modifyReservation = (req, res, next) => {
	Reservation.updateOne(
		{ _id: req.params.id },
		{ ...req.body, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: "Reservation modifié" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteReservation = (req, res, next) => {
	Reservation.findOne({ _id: req.params.id }).then((reservation) => {
		if (!reservation) {
			res.status(404).json({
				error: new Error("Pas de réservation !"),
			});
		}
		if (reservation.userId !== req.auth.userId) {
			res.status(400).json({
				error: new Error("Demande non autorisée !"),
			});
		}
		Reservation.deleteOne({ _id: req.params.id })
			.then(() => {
				res.status(200).json({
					message: "Réservation supprimée !",
				});
			})
			.catch((error) => {
				res.status(400).json({
					error: error,
				});
			});
	});
};
