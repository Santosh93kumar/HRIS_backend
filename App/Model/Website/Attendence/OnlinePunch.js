const mongoose = require("mongoose");

const punchInSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    // trim: true,
  }
});

module.exports = mongoose.model('PunchIn', punchInSchema);
