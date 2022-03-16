const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		cover: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Destination", DestinationSchema);
