const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.js");
const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized : No token Provided" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decode.id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized : user is not an admin " });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { isAdmin };
