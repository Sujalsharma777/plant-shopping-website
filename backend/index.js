const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5173;

app.get("/pings", (req, res) => {
  res.send("PONG");
});
app.listen(PORT, () => {
  console.log(`sever start ${PORT}`);
});
