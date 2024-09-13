const {Router} = require("express");
const libraryController = require("../controllers/libraryController");

const router = Router();


//Get
router.get("/library", libraryController.displayLibrary)
router.get("/log-out", libraryController.logOutGet);

//Post






module.exports = router;
