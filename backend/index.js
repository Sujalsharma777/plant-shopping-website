const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./models/db");
const authRoutes = require("./routes/Authrouter");
const orderRoutes = require("./routes/orderRoutes");
const path = require("path");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/auth", orderRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5000, () => console.log("Server running on port 5000"));
