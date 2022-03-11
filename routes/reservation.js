const router = require("express").Router();
const {
	verifyTokenAndAdmin,
	verifyToken,
} = require("../middleware/verifyToken");
const Reservation = require("../models/Reservation");

// CREATE RESERVATION
router.post("/create", verifyToken, async (req, res) => {
	newReservation = new Reservation(req.body);
	try {
		const reservation = await newReservation.save();
		res.status(201).json({
			message: "Reservation Added Successfully!",
			reservation,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET ALL RESERVATION
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const reservation = await Reservation.find();
		res.status(200).json(reservation);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET RESERVATION
router.get("/show/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const reservation = await Reservation.findById(req.params.id);
		res.status(200).json(reservation);
	} catch (err) {
		res.status.json({ message: err.message });
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
		res.status(200).json({
			message: "Reservation Updated Successfully!",
			updatedReservation,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// DELETE RESERVATION
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Reservation.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Reservation has been deleted." });
	} catch (err) {
		res.status.json({ message: err.message });
	}
});

module.exports = router;
