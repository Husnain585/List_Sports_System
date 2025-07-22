const mongoose = require("mongoose");
const validator = require("validator")
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim:true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid email address",
    },
  },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["participant", "coach", "admin"],
    default: "participant",
  },

  approved: { type: Boolean, default: false },
  approvedByCoach: { type: Boolean, default: true },

  sportsPreferences: [String],
  pastParticipation: [String],
  achievements: [String],
  expertise: [String],

  // Account status: whether user is active or blocked
  accountStatus: { 
    type: String, 
    enum: ["active", "blocked"], 
    default: "active" 
  },

  // Approval status workflow
  approvalStatus: {
    type: String,
    enum: ["pending-coach", "pending-admin", "approved", "rejected"],
    default: "pending-coach"
  },

  // Status 
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  
  // Team associations (referencing Team model)
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],

  // Who approved the user (referencing User model)
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
 
module.exports = mongoose.model("User", UserSchema);
