const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./models/db");
const authRoutes = require("./routes/Authrouter");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://localhost:5173/mern-admin-panel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRoutes);
app.use("/api/auth", orderRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5000, () => console.log("Server running on port 5000"));
