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
    const   { email }  = req.user;
    const folders = await db.getAllFolders(email);
    //const timeAgo = `created ${displayTimeAgo(folders.createdAt)} ago`



    res.render("views/library", { user: req.user, folders: folders, formatDistanceToNow: formatDistanceToNow})
}




  module.exports =  {

    logOutGet,
    displayLibrary



  }
