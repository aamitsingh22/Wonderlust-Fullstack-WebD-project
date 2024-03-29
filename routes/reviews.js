const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//Reviews
//Post Route
router.post("/",validateReview,isLoggedIn,
wrapAsync(reviewController.createReview));

//Delete review Route
router.delete("/:reviewId/delete",isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;