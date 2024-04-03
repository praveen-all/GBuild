const express = require("express");
const {
  sendMessage,
  getAllMsg,
} = require("../controllers/messageController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/sendMsg", protect, sendMessage);
router.get("/getAll", protect, getAllMsg);

module.exports = router;
