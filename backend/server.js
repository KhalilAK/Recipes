const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static folders for CSS and JS
app.use("/css", express.static(path.join(__dirname, "..", "css")));
app.use("/js", express.static(path.join(__dirname, "..", "js")));

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// API routes
app.use("/auth", authRoutes);

// Sync DB and start server
sequelize.sync({ alter: true }).then(() => console.log("Modules synced"));

const PORT = process.env.PORT || 2002; // Render sets this automatically
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
