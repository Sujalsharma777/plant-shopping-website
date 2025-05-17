const { signup, login } = require("../controllers/AthController");
const {
  signupvaildation,
  loginvaildation,
} = require("../middlewares/AuthVaildation");

const router = require("express").Router();

router.post("/login", loginvaildation, login);
router.post("/signup", signupvaildation, signup);

module.export = router;
