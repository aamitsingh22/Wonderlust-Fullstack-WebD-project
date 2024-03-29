const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
//signup route
.get(userController.renderSignupFrom)
.post(wrapAsync(userController.signup));

router.route("/login")
//login route
.get(userController.renderLoginFrom)
.post(saveRedirectUrl,passport.authenticate("local",{ failureRedirect:"/login",failureFlash:true}),userController.login);

//logout route

router.get("/logout",userController.logout);

module.exports = router;