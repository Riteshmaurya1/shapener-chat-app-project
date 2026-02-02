const express = require("express");
const router = express.Router();
const fileController = require("../Controller/fileController");

// Upload endpoint
router.post("/upload", fileController.uploadFile);

module.exports = router;
