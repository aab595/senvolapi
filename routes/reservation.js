const router = require("express").Router();
const reservationCtrl = require("../controllers/reservation");
const { verifyTokenAndAuthorization } = require("../middleware/authorization");

router.get("/", verifyTokenAndAuthorization, reservationCtrl.getAllReservation);
router.post("/", verifyTokenAndAuthorization, reservationCtrl.createReservation);
router.get("/:id", verifyTokenAndAuthorization, reservationCtrl.getOneReservation);
router.put("/:id", verifyTokenAndAuthorization, reservationCtrl.modifyReservation);
router.delete("/:id", verifyTokenAndAuthorization, reservationCtrl.deleteReservation);

module.exports = router;
