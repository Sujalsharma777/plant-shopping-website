const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./models/db.js");
const authRoutes = require("./routes/Authrouter.js");
const orderRoutes = require("./routes/orderRoutes.js");
const path = require("path");
const adminRoutes = require("./routes/adminRoutes.js");
dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "https://plant-shopping-website.onrender.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/auth", orderRoutes);
app.use("/admin", adminRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => console.log("Server running on port 5000"));
