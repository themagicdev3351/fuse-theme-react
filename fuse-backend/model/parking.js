const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
  type: { type: String, default: null },
  pletNumber: { type: Number, default: null },
  howTime: { type: String, default: null },
  name: { type: String, default: null },
  userId: { type: String, default: null },
});

module.exports = mongoose.model("parking", ParkingSchema);
