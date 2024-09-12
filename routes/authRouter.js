const {Router} = require("express");
const authController = require("../controllers/authController");

const router = Router();



router.get("/", authController.displayIndex)
router.get("/sign-up", authController.signUpGet);
router.get("/log-in", authController.logInGet);
router.get("/library", authController.displayLibrary);





module.exports = router;
