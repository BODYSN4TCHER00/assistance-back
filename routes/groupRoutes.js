const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/", groupController.getGroups);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.delete("/:id", groupController.deleteGroup);

module.exports = router;
