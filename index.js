const express = require("express");
const mongoose = require("mongoose");
const Info = require("./model/info.js");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_DB;  // ✅ fixed

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Mongoose Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
}
main();

// Routes
app.post("/info", async (req, res) => {
  try {
    const { name, email, number, message } = req.body;
    const newInfo = new Info({ name, email, number, message });
    await newInfo.save();
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("❌ Error saving form:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Added GET route
app.get("/info", async (req, res) => {
  try {
    const allInfo = await Info.find();
    res.status(200).json(allInfo);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
