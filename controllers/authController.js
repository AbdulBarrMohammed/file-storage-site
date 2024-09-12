
const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/queries');
const { body, validationResult } = require("express-validator");


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
    res.render("views/library")
}


module.exports =  {

    displayIndex,
    signUpGet,
    logInGet,
    displayLibrary


  }
