const {Router} = require("express");
const fileController = require("../controllers/fileController");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = Router();



router.post("/library/create/file", upload.single('file'), fileController.createFilePost);
router.post("/library/file/delete/:id", fileController.deleteFilePost);
router.post("/library/file/update/:id", fileController.editFilePost);
router.get("/library/file/:id", fileController.getSelectedFile);
router.get("/library/file/selectedFile", fileController.getSelectedFile);
//router.post("/library/folder/createSubFolder/:id", folderController.addSubFolderPost)


module.exports = router;
