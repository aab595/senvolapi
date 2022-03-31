const router = require("express").Router();
const reservationCtrl = require("../controllers/reservation");
const { verifyToken } = require("../middleware/authorization");

router.get("/", verifyToken, reservationCtrl.getAllReservation);
router.post("/", verifyToken, reservationCtrl.createReservation);
router.get("/:id", verifyToken, reservationCtrl.getOneReservation);
router.put("/:id", verifyToken, reservationCtrl.modifyReservation);
router.delete("/:id", verifyToken, reservationCtrl.deleteReservation);

module.exports = router;
