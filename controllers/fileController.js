const db = require("../db/queries");
const { formatDistanceToNow }  = require('date-fns');
cloudinary = require('cloudinary');

// add function to add file to subfolders

/*
(async function() {

    // Configuration
    cloudinary.config({
        cloud_name: 'dzuhra9bj',
        api_key: '311875277133285',
        api_secret: 'VNh1gI5JRjLCiG6JXpT7lIIgoKs' // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'files',
           }
       )
       .catch((error) => {
           console.log(error);
       });

    console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('files', {
        fetch_format: 'auto',
        quality: 'auto'
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('files', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    console.log(autoCropUrl);
})();
*/

async function createFilePost(req, res, next) {
    //res.send('Uploaded Successfully');
    const { email } = req.user;
    console.log(email)
    console.log('email above');
    const { originalname, size} = req.file;
    const createdAt = new Date();
    await db.insertNewFile({originalname, size, createdAt, email})


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
    res.render(`views/selectedFile`, {user: req.user});
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
    const { email } = req.user;
    const folderId = req.params.id;
    const { originalname, size} = req.file;
    const createdAt = new Date();
    await db.insertNewSubFile({originalname, size, createdAt, email, folderId})

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

  /*

  {
    fieldname: 'file',
    originalname: 'indy.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'uploads/',
    filename: '2a03118eaf0498b9069cb2d6f7212d5d',
    path: 'uploads/2a03118eaf0498b9069cb2d6f7212d5d',
    size: 2374883
  } */
