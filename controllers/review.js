const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res) => {
      let listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.review);  
      newReview.author = req.user._id;

      listing.reviews.push(newReview);
  
      await newReview.save();
      await listing.save();
      req.flash("success","New review created");
      res.redirect(`/foodZest/${listing._id}`);
    }

module.exports.deleteReview =async (req, res) => {
      let { id, reviewId } = req.params;
      
      // pull operater is used to delete the value from the retain array
      await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
      await Review.findByIdAndDelete(reviewId);

      req.flash("success","Review deleted!");
      res.redirect(`/foodZest/${id}`);
    }