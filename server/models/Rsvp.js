const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema({
  name: String,
  email: String,
  side: String,
  relationship: String,
  guests: Number,
  message: String,
  attendance: String,
  meal: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rsvp", rsvpSchema);