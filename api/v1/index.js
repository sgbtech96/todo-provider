const express = require("express");
const router = express.Router();

router.use("/onboarding", require("./onboarding/routes"));
router.use("/profile", require("./profile/routes"));
router.use("/todos", require("./todos/routes"));

module.exports = router;
