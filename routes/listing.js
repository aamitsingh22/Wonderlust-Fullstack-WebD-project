const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
// listing route
.get(wrapAsync(listingController.index));

router.route("/new")
//new route
.get(isLoggedIn,listingController.renderNewForm)
//create route
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

//category route
router.get("/:category/category",wrapAsync(listingController.category));

//show route
router.get("/:id/show",wrapAsync(listingController.showListing));

router.route("/:id/edit")
//edit route
.get(isLoggedIn,isOwner,listingController.renderEditFrom)
//update route
.put(isLoggedIn,
isOwner,
upload.single('listing[image]'),
validateListing,
wrapAsync(listingController.updateListing));

//Delete route
router.delete("/:id/delete",isLoggedIn,listingController.deleteListing);

module.exports = router;