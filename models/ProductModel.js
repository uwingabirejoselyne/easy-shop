const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required:true
  },
  brand: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    select: false
  },
  sold: {
    type: Number,
    select: false
  },
  images: [],
  color: {
    type: String,
    required: true
  },
  ratings: [
    {
      star: Number,
    },
  ],
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
