const express = require("express");

const router = express.Router();

const {
 reportIssue,
 getMyIssues
} = require("../controllers/cropController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/report", authMiddleware, reportIssue);

router.get("/myissues", authMiddleware, getMyIssues);

module.exports = router;