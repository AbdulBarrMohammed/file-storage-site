const db = require("../db/queries");
const { formatDistanceToNow }  = require('date-fns');
//const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })


async function createFilePost(req, res, next) {
    res.send('Uploaded Successfully');

    //res.redirect("/library")

    //

}


async function deleteFilePost(req, res) {
    //const { email } = req.user;
    const id = req.params.id;
    const parentId  = req.params.id;
    console.log(parentId)
    console.log('delete confirmed')
    console.log(id);
    await db.deleteFolder(id)

    //res.redirect(`/library/folder/${parentId}`)


    res.redirect("/library")


}

async function editFilePost(req, res) {
    const {newFolderName} = req.body;
    await db.updateFolder(req.params.id, newFolderName);
    res.redirect("/library");


}

async function getSelectedFile(req, res) {
    res.render(`views/selectedFile`, {user: req.user});
}



module.exports =  {

    createFilePost,
    deleteFilePost,
    editFilePost,
    getSelectedFile


  }
