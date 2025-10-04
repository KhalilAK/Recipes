const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync({alter: true}).then(() => console.log("Modules synced"));
app.use("/auth", authRoutes);
app.listen(2002, () => console.log("Server running on http://localhost:2002"));
