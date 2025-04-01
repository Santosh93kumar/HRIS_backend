const express = require("express");
const cors = require("cors");
const path = require("path");
let mongoose = require("mongoose");
require("dotenv").config();
const { mainRouts } = require("./App/mainRouts");
const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Referrer-Policy"],
  })
);
app.use(express.json());
const PORT = process.env.PORT || 8001;
// Routes
app.use(mainRouts);

app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "UP", message: "Server is running smoothly!" });
});

// Serve static files from 'uploads/EmployeeImage'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads/BalanceImage", express.static("uploads/BalanceImage"));

console.log("hi",process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
