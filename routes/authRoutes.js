const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getLoginCounts
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/login-counts", getLoginCounts);

module.exports = router;