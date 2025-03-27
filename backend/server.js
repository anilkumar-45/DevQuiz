require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors")
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes.js");
const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/auth", authRoutes);

// Database connetion

if (!process.env.MONGO_URI) {
  console.error("MongoDB URI in not defined in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
