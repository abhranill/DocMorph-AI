const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const uploadRoutes = require("./routes/upload.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Upload API
app.use("/upload", uploadRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 DocMorph AI Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});