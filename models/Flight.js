const mongoose = require("mongoose");

const FlightSchema = mongoose.Schema(
	{
		flightType: {
			type: String,
			required: true,
			enum: ["Aller-simple", "Aller-retour"],
		},
		startCity: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			default: Date.now(),
		},
		endDate: {
			type: Date,
			default: Date.now(),
		},
		rate: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Flight", FlightSchema);
