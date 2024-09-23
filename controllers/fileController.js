const db = require("../db/queries");
const { formatDistanceToNow }  = require('date-fns');
cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'dzuhra9bj',
    secure: true,
    api_key: '311875277133285',
    api_secret: 'VNh1gI5JRjLCiG6JXpT7lIIgoKs' // Click 'View API Keys' above to copy your API secret
});


//get image from cloudinary




async function createFilePost(req, res, next) {
    //res.send('Uploaded Successfully');
    const { email } = req.user;

    const fileType = req.file.mimetype;  // Get the file MIME type


    // Determine resource type based on file MIME type
    let resourceType = "auto";  // Default to "auto" for dynamic handling
    if (fileType === "application/pdf") {
        resourceType = "raw";  // PDFs are treated as raw files
    } else if (fileType.startsWith("image/")) {
        resourceType = "image";  // Images should use "image" resource type
    }

    const results = await cloudinary.uploader.upload(req.file.path, {
        resource_type: resourceType,

    })
    console.log('Cloudinary Upload Result:', results);
    //const path = results.secure_url;
    const url = results.secure_url;
    let path = url.replace('/upload/', '/upload/pg_1/').replace('.pdf', '.jpg');


    const { originalname, size } = req.file;
    const createdAt = new Date();
    await db.insertNewFile({originalname, size, path, createdAt, email})
    res.redirect("/library")

}

async function editFilePost(req, res) {
    const { newFileName } = req.body;
    await db.updateFile(req.params.id, newFileName);
    res.redirect("/library");


}

async function editSubFilePost(req, res) {
    const { newFileName } = req.body;
    const id = req.params.folderId;
    const subFolder = await db.getFolder(id);
    const parentId = subFolder.id;
    console.log(`id: ${id}`)
    console.log(`subfolder: ${subFolder}`)

    await db.updateFile(req.params.id, newFileName);

    res.redirect(`/library/folder/${parentId}`)
    //res.redirect('/library')



}

async function getSelectedFile(req, res) {
    const id = req.params.id;
    const file = await db.getFile(id)
    res.render(`views/selectedFile`, {user: req.user, file: file});
}

async function deleteFilePost(req, res) {

    const id = req.params.id;
    console.log('delete file confirmed')
    await db.deleteFile(id)

    res.redirect("/library")


}

async function deleteSubFilePost(req, res) {
    const id = req.params.folderId;
    const subFolder = await db.getFolder(id);
    const parentId = subFolder.id;
    await db.deleteFile(req.params.id);

    res.redirect(`/library/folder/${parentId}`)


}

async function addSubFilePost(req, res, next) {

    const fileType = req.file.mimetype;  // Get the file MIME type


    // Determine resource type based on file MIME type
    let resourceType = "auto";  // Default to "auto" for dynamic handling
    if (fileType === "application/pdf") {
        resourceType = "raw";  // PDFs are treated as raw files
    } else if (fileType.startsWith("image/")) {
        resourceType = "image";  // Images should use "image" resource type
    }

    const results = await cloudinary.uploader.upload(req.file.path, {
        resource_type: resourceType,

    })
    console.log('Cloudinary Upload Result:', results);
    //const path = results.secure_url;
    const url = results.secure_url;
    let path = url.replace('/upload/', '/upload/pg_1/').replace('.pdf', '.jpg');

    const { email } = req.user;
    const folderId = req.params.id;
    const { originalname, size} = req.file;
    const createdAt = new Date();
    await db.insertNewSubFile({originalname, size, createdAt, path, email, folderId})

    res.redirect(`/library/folder/${folderId}`)

}

module.exports =  {

    createFilePost,
    deleteFilePost,
    editFilePost,
    getSelectedFile,
    addSubFilePost,
    editSubFilePost,
    deleteSubFilePost


  }
