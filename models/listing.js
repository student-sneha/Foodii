const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: Number,
  image: {
    url: String,
    filename:String,
  },
  famousDish: String,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete",async(listing) =>{
  if(listing){
    await Review.deleteMany({_id : {$in: listing.review}});
  }
 });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
