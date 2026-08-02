const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const uploadRoutes = require("./routes/upload.routes");
const chatRoutes = require("./routes/chat.routes");
const convertRoutes = require("./routes/convert.routes");

const app = express();

// =========================
// Middlewares
// =========================
app.use(cors());
app.use(express.json());

// =========================
// Static Folders
// =========================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(
  "/converted",
  express.static(path.join(__dirname, "converted"))
);

// =========================
// API Routes
// =========================
app.use("/upload", uploadRoutes);
app.use("/chat", chatRoutes);
app.use("/convert", convertRoutes);

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 DocMorph AI Backend Running",
  });
});

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});