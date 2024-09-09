const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const authRouter = require("./routes/authRouter");

const app = express();
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);

//module.exports = { passport };

module.exports = app;


app.listen(4003, () => console.log("app listening on port 4003!"));
