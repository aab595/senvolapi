const router = require("express").Router();
const destinationCtrl = require("../controllers/destination");
const { verifyTokenAndAdmin } = require("../middleware/authorization");

router.get("/", destinationCtrl.getAllDestination);
router.post("/", verifyTokenAndAdmin, destinationCtrl.createDestination);
router.get("/:id", destinationCtrl.getOneDestination);
router.put("/:id", verifyTokenAndAdmin, destinationCtrl.modifyDestination);
router.delete("/:id", verifyTokenAndAdmin, destinationCtrl.deleteDestination);

module.exports = router;
