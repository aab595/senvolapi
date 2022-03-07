const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
	{
		volRef: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		numPassenger: {
			adult: {
				type: Number,
				default: 0,
			},
			child: {
				type: Number,
				default: 0,
			},
			baby: {
				type: Number,
				default: 0,
			},
		},
		classe: {
			type: String,
			enum: ["Economy", "Eco-Premium", "Business"],
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
