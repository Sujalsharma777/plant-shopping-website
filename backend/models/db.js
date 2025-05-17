const mongoose = require("mongoose");

// PLYlALgke5A9sjCt
const mong_url = process.env.mongodburl;
mongoose
  .connect(mong_url)
  .then(() => {
    console.log("monogo conected");
  })
  .catch((err) => {
    console.log("Mongodb failed", err);
  });
