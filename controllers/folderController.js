const db = require("../db/queries");
const { formatDistanceToNow }  = require('date-fns');

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

async function editFolderPost(req, res) {
    const {newFolderName} = req.body;
    await db.updateFolder(req.params.id, newFolderName);
    res.redirect("/library");


}

async function getSelectedFolder(req, res) {
    const id = req.params.id;
    console.log('folder id below')
    console.log(id);
    const folder = await db.getFolder(id);
    console.log("folder below")
    console.log(folder);
    const parentId = req.params.id;
    const subFolders = await db.getAllSubFolders(parentId);
    res.render(`views/selectedFolder`, {user: req.user, folder: folder, formatDistanceToNow: formatDistanceToNow, subFolders: subFolders});
}

async function addSubFolderPost(req, res) {
    //get parent id from current folder;
    const { email } = req.user;
    const parentId = req.params.id;
    const { subFolderName } = req.body;
    const createdAt = new Date();
    await db.insertNewSubFolder({ subFolderName, createdAt, parentId, email });
    res.redirect(`/library/folder/${parentId}`)



}

async function deleteSubFolderPost(req, res) {
    const id = req.params.id;
    const subFolder = await db.getFolder(id);
    const parentId = subFolder.parentId
    await db.deleteFolder(id)

    res.redirect(`/library/folder/${parentId}`)
}

async function editSubFolderPost(req, res) {
    const id = req.params.id;
    const subFolder = await db.getFolder(id);
    const parentId = subFolder.parentId;

    const {newSubFolderName} = req.body;
    await db.updateFolder(req.params.id, newSubFolderName);

    res.redirect(`/library/folder/${parentId}`)



}


module.exports =  {

    createFolderGet,
    createFolderPost,
    deleteFolderPost,
    editFolderPost,
    getSelectedFolder,
    addSubFolderPost,
    deleteSubFolderPost,
    editSubFolderPost


  }
