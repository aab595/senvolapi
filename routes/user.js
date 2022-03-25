const router = require("express").Router();
const userCtrl = require("../controllers/user");
const { verifyTokenAndAdmin } = require("../middleware/authorization");

router.get("/", verifyTokenAndAdmin, userCtrl.getAllUser);
router.get("/:id", verifyTokenAndAdmin, userCtrl.getOneUser);
router.put("/:id", verifyTokenAndAdmin, userCtrl.modifyUser);
router.delete("/:id", verifyTokenAndAdmin, userCtrl.deleteUser);

module.exports = router;
