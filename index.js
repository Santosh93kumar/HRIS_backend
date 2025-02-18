const express = require("express");
const app = express();
const cors = require("cors");

let mongoose = require("mongoose");
const { mainRouts } = require("./App/mainRouts");


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(mainRouts);

// Serve static files from 'uploads/EmployeeImage'
app.use("/uploads/EmployeeImage", express.static("uploads/EmployeeImage"));
app.use("/uploads/BalanceImage", express.static("uploads/BalanceImage"));


mongoose.connect(`mongodb://127.0.0.1:27017/HRISPROJECT`)
  .then(() => {
    console.log("Connected to MongoDB");
  });

// Default Routes
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Your Server is up and running'
  });
});
app.listen("8000", () => {
  console.log(`Your App Is Running At Port No. 8000`);
})
