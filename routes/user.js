const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { route } = require("./listing.js");
const passport = require("passport");
const { saveRedirectedUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectedUrl,
    passport.authenticate("local", {
      failureRedirect: "/login", //it is used to redirect us on some page when your name is wrong
      failureFlash: true, //it is used to flash a message when worng data is pass
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
