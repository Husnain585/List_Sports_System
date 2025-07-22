const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport: {
    type: String,
    required: true,
    enum: ['Football', 'Cricket', 'Basketball', 'Volleyball', 'Hockey'],
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  coach: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approved: { type: Boolean, default: false }, // ✅ Add this
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Team", TeamSchema);
