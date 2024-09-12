
const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/queries');
const { body, validationResult } = require("express-validator");



const passLengthErr =  "must be at least 8 characters.";
const usernameLengthErr =  "must be at least 5 characters.";

const validateUser = [

 body("email").trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .isLength({ min: 5, max: 100 }).withMessage(`Email ${usernameLengthErr}`),
 body("password").notEmpty()
    .withMessage('Password is required').trim().isLength({min: 8, max: 50}).withMessage(`Password ${passLengthErr}`).matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number'),
]

//Get
async function displayIndex(req, res) {

    res.render("views/index");
}

async function signUpGet(req, res) {
    res.render("views/signUpForm");
}

async function logInGet(req, res) {
    res.render("views/logInForm");
}

async function displayLibrary(req, res) {
    res.render("views/library", { user: req.user })
}



//Post

/*
async function logInPost(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/library",
        failureRedirect: "/"
      })(req, res, next);
}*/

async function logInPost(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Authentication error:', err);
        return next(err);
      }
      if (!user) {
        console.log('Authentication failed:', info.message);
        return res.redirect('/'); // Redirect to the login page or display an error
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Error logging in user:', err);
          return next(err);
        }
        return res.redirect('/library');
      });
    })(req, res, next);
  }

const signUpPost = [
    validateUser,

     async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("ERRRORRRR")
        return res.status(400).render("views/signUpForm", {
          title: "Sign Up",
          errors: errors.array(),
        });
      }
      const { email, password  } = req.body;
      console.log(email, password)

      try {
        // Hash the password with bcrypt
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          console.log(hashedPassword)
          if (err) {
            // Handle hashing error
            return next(err);
          }

          // Store hashedPassword in DB
          try {
              console.log(email);
              await db.insertNewUsers({email, hashedPassword});

            console.log('User signed up successfully');

            res.redirect("library");
          } catch (dbError) {
            // Handle database insertion error
            return next(dbError);
          }
        });
      } catch (err) {
        // Handle other errors
        return next(err);
      }
  }

]

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
      try {
        const user = await db.getUser(email);
        console.log(user);


        if (!user) {
            console.log("wrong email")
          return done(null, false, { message: "Incorrect email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        // passwords do not match!
        console.log("wrong password")
        return done(null, false, { message: "Incorrect password" })

        }
        return done(null, user);
      } catch(err) {
        console.log("just err")
        return done(err);
      }
    })
  );


passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserById(id);

      done(null, user);
    } catch(err) {
        console.log("deserial err")
      done(err);
    }
  });

  async function logOutGet(req, res){
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });

  }



module.exports =  {

    displayIndex,
    signUpGet,
    logInGet,
    displayLibrary,
    signUpPost,
    logOutGet,
    logInPost


  }
