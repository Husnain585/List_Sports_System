const mongoose = require("mongoose");

const sportCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you have a 'User' model
    required: false // organizer can be assigned later
  }
}, { timestamps: true });

module.exports = mongoose.model("SportCategory", sportCategorySchema);
