const { mongoose } = require("mongoose");



let shiftSchema = new mongoose.Schema(
  {
    shiftName: {
      type: String,
      enum: [" Day Shift", "OverNight Shift"],
      required: true,
    },
    assignedEmployee: {
      type:String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Employee",  // Reference to the Employee model
    },
    shiftIn: {
      type: String, // Store as a formatted time string (e.g., "9:00:00 AM")
    },
    shiftOut: {
      type: String, // Store as a formatted time string (e.g., "2:00:00 PM")
    },
    ShiftOutNextDay: {
      type: String,
      enum: ["Day Shift", "OverNight Shift"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);




const shiftModel = mongoose.model("Shift", shiftSchema);
module.exports = { shiftModel };
