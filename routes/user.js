const express = require("express");
const router = express.Router();

const { handleUserSignup, handleUserSignIn } = require("../controllers/user");

router.post("/signup", handleUserSignup);

router.post("/signin", handleUserSignIn);

module.exports = router;
