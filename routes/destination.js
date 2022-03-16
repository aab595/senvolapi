const router = require("express").Router();
const {
	verifyTokenAndAdmin,
	verifyToken,
} = require("../middleware/verifyToken");
const Destination = require("../models/Destination");

// CREATE Destination
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
	const newDestination = new Destination(req.body);
	try {
		const destination = await newDestination.save();
		res.status(201).json({
			message: "Destination Added Successfully!",
			destination,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET ALL Destination
router.get("/", async (req, res) => {
	try {
		const destinations = await Destination.find();
		res.status(200).json(destinations);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET Destination
router.get("/show/:id", async (req, res) => {
	try {
		const destination = await Destination.findById(req.params.id);
		res.status(200).json(destination);
	} catch (err) {
		res.status.json({ message: err.message });
	}
});

// EDIT Destination
router.put("/edit/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedDestination = await Destination.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json({
			message: "Destination Updated Successfully!",
			updatedDestination,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// DELETE Destination
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Destination.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Destination has been deleted." });
	} catch (err) {
		res.status.json({ message: err.message });
	}
});

module.exports = router;
