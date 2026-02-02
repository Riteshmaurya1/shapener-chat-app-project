const express = require("express");
const router = express.Router();
const auth = require("../Middleware/verifyJwt");
const groupController = require("../Controller/groupController");

router.post("/create", auth, groupController.createGroup);
router.get("/getmygroups", auth, groupController.getUserGroups);
router.delete("/delete/:groupId", auth, groupController.deleteGroup);

module.exports = router;
