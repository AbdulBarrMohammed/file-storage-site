const db = require('../db/queries');

const { formatDistanceToNow }  = require('date-fns');


async function logOutGet(req, res){
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });

  }



  async function displayLibrary(req, res) {
    const { email }  = req.user;
    const folders = await db.getAllFolders(email);
    const files = await db.getAllFiles(email);
    res.render("views/library", { user: req.user, folders: folders, files: files, formatDistanceToNow: formatDistanceToNow})
}




  module.exports =  {

    logOutGet,
    displayLibrary



  }
