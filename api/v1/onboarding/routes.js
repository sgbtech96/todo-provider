const express = require("express");
const login = require("./login");
const logout = require("./logout");
const auth = require("../../../middleware/auth");

const router = express.Router();

router.post("/googleLogin", login);
router.get("/logout", [auth], logout);

module.exports = router;
