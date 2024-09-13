const db = require("../db/queries");

// ADD, DELETE, EDIT FOLDER
async function createFolderGet(req ,res) {

    //res.render("views/library");


}

async function createFolderPost(req, res) {
    //get email for current logged in user
    const { email } = req.user;
    const { folderName } = req.body;
    const createdAt = new Date();


    //insert new folder
    await db.insertNewFolder({ email, folderName, createdAt })

    res.redirect("/library")

    //

}

async function deleteFolderPost(req, res) {

}

async function editFolderPost(req, res) {

}

async function editFolderGet(req, res) {

}

module.exports =  {

    createFolderGet,
    createFolderPost,
    deleteFolderPost,
    editFolderGet,
    editFolderPost

  }
