const router = require("express").Router();
const authCtrl = require("../controllers/auth");

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
