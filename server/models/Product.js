const mongoose = require("mongoose");
const { String, ObjectId, Number, Boolean } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    required: true,
  },
  delivery: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: ObjectId,
    ref: "User",
  },
  imageUrls: [
    {
      url: {
        type: String,
      },
      imgId: {
        type: String,
      },
    },
  ],
  createdOn: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);
