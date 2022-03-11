const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const Flight = require("../models/Flight");

// CREATE FLIGHT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
	newFlight = new Flight(req.body);
	try {
		const flight = await newFlight.save();
		res.status(201).json({
			message: "Flight added successfully!",
			flight,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET ALL FLIGHT
router.get("/", async (req, res) => {
	try {
		const flights = await Flight.find();
		res.status(200).json(flights);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET FLIGHT
router.get("/show/:id", async (req, res) => {
	try {
		const flight = await Flight.findById(req.params.id);
		res.status(200).json(flight);
	} catch (err) {
		res.status.json(err);
	}
});

// EDIT FLIGHT
router.put("/edit/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedFlight = await Flight.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedFlight);
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE FLIGHT
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Flight.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Flight has been deleted." });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
