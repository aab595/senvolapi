const router = require("express").Router();
const { verifyTokenAndAdmin, verifyToken } = require("../middleware/verifyToken");
const Reservation = require("../models/Reservation");

// CREATE RESERVATION
router.post("/", verifyToken, async (req, res) => {
    newReservation = new Reservation(req.body);
    try {
        const reservation = await newReservation.save()
        res.status(201).json(reservation)
	} catch (err) {
        res.status(500).json(err)
    }
});

// GET ALL RESERVATION
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const reservation = await Reservation.find();
		res.status(200).json(reservation);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET RESERVATION
router.get("/show/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const reservation = await Reservation.findById(req.params.id);
		res.status(200).json(reservation);
	} catch (err) {
		res.status.json(err);
	}
});

// EDIT RESERVATION
router.put("/edit/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedReservation = await Reservation.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedReservation);
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE RESERVATION
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Reservation.findByIdAndDelete(req.params.id);
		res.status(200).json("Reservation has been deleted.");
	} catch (err) {
		res.status.json(err);
	}
});

module.exports = router;
