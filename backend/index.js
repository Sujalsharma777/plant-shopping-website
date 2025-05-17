const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const AuthRouter = require("./routes/Authrouter");

const PORT = process.env.PORT || 3000;
app.get("/pings", (req, res) => {
  res.send("PONG");
});
app.use(bodyparser.json());
app.use(cors());
app.use("auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`sever start ${PORT}`);
});
