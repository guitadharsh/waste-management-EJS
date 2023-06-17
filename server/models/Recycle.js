const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RecycleSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Place: {
    type: String,
    required: true,
  },
  Category: {
    type: Number,
    required: true,
  },

  Quantity: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recycle", RecycleSchema);
