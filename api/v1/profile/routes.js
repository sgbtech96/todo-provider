const express = require("express");
const me = require("./getProfile");
const auth = require("../../../middleware/auth");

const router = express.Router();

router.get("/me", [auth], me);

module.exports = router;
