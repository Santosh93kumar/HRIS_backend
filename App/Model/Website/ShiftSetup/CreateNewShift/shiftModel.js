const { mongoose } = require("mongoose");

let shiftSchema = new mongoose.Schema(
  {
    shiftName: {
      type: String,
      enum:["9 AM to 2 PM","2 PM to 6 PM"],
      required: true,
    },
    shiftIN: {
      hours: {
        type: Number,
        required: true,
        min: 0,
        max: 8, // Ensures valid hour range
      },
      minutes: {
        type: Number,
        required: true,
        min: 0,
        max: 59, // Ensures valid minute range
      },
      seconds: {
        type: Number,
        required: true,
        min: 0,
        max: 59, // Ensures valid second range
      },
    },
    shiftOUT: {
      hours: {
        type: Number,
        required: true,
        min: 0,
        max: 8, // Ensures valid hour range
      },
      minutes: {
        type: Number,
        required: true,
        min: 0,
        max: 59, // Ensures valid minute range
      },
      seconds: {
        type: Number,
        required: true,
        min: 0,
        max: 59, // Ensures valid second range
      },
    },
    ShiftOutNextDay: {
      type: String,
      enum:["9 AM to 2 PM","2 PM to 6 PM"],
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

const shiftModel = mongoose.model("Shift", shiftSchema);
module.exports = { shiftModel };
