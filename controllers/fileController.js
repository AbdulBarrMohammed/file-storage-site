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
    const { filename, size} = req.file;
    const createdAt = new Date();
    await db.insertNewFile({filename, size, createdAt, email})


    res.redirect("/library")

}


async function deleteFilePost(req, res) {
    //const { email } = req.user;


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
