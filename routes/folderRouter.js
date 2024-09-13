const {Router} = require("express");
const folderController = require("../controllers/folderController");

const router = Router();


router.get("/library/create", folderController.createFolderGet);
router.post("/library/create", folderController.createFolderPost);
router.post("/library/folder/delete/:id", folderController.deleteFolderPost);
router.get("/library/folder/update/:id", folderController.editFolderGet);
router.post("/library/folder/update/:id", folderController.editFolderPost);


module.exports = router;
