// IMPORTING EXTERNAL MODULES
require("dotenv").config();
const compression = require("compression")
const express     = require("express");
const mongoose    = require("mongoose");
// APP COMPRESSING
app.use(compression())
// IMPORTING ROUTES
const userRoute        = require("./routes/user");
const authRoute        = require("./routes/auth");
const flightRoute      = require("./routes/flight");
const reservationRoute = require("./routes/reservation");
const destinationRoute = require("./routes/destination");
// DECLARATIONS
const app  = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// DB CONNECTION
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

// CORS CONFIG
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

// PARSING JSON BODY
app.use(express.json());

// ROUTES DEFINITION
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/flights", flightRoute);
app.use("/api/reservations", reservationRoute);
app.use("/api/destinations", destinationRoute);

module.exports = app;
