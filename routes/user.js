const router = require("express").Router();
const {
	verifyTokenAndAdmin,
	verifyToken,
	verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

// GET ALL USER
router.get("/", verifyToken, async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET USER
router.get("/show/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		res.status.json(err);
	}
});

// EDIT USER
router.put("/edit/:id", verifyTokenAndAuthorization, async (req, res) => {
	if (req.body.password) {
		req.body.password = CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString();
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE USER
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("User has been deleted.");
	} catch (err) {
		res.status.json(err);
	}
});

module.exports = router;
