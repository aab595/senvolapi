const router = require("express").Router();
const flightCtrl = require("../controllers/flight");
const { verifyTokenAndAdmin } = require("../middleware/authorization");

router.get("/", flightCtrl.getAllFlight);
router.post("/", verifyTokenAndAdmin, flightCtrl.createFlight);
router.get("/:id", flightCtrl.getOneFlight);
router.put("/:id", verifyTokenAndAdmin, flightCtrl.modifyFlight);
router.delete("/:id", verifyTokenAndAdmin, flightCtrl.deleteFlight);

module.exports = router;
