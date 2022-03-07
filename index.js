// IMPORTING EXTERNAL MODULES
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// IMPORTING ROUTES
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const flightRoute = require("./routes/flight");
const reservationRoute = require("./routes/reservation");

const app = express();
// PARSING JSON BODY
app.use(express.json());
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// DB CONNECTION
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Database Connection Established Successfully"))
	.catch((err) => console.error(err.message));

// ROUTES DEFINITION
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/flight", flightRoute);
app.use("/api/reservation", reservationRoute);

// SERVER STARTUP
app.listen(PORT, () => {
	console.log(`Server Running on http://${HOST}:${PORT}`);
});
