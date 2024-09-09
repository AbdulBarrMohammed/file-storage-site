const {Router} = require("express");
const authController = require("../controllers/authController");

const router = Router();



router.get("/", authController.displayIndex)



module.exports = router;
