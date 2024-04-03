const express = require("express");
const {
  findUser,
  createChat,
  getChatById,
  createGroup,
  getAllChatbyUserId,
  updateGroupName,
  addUserTogroup,
  deleteChat,
} = require("../controllers/chatController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/findUser", findUser);
router.post("/create", protect, createChat);
router.post("/createGroup", protect, createGroup);
router.get("/chats:chatId", protect, getChatById);
router.get("/getAll", protect, getAllChatbyUserId);
router.put("/updateChatName", protect, updateGroupName);
router.put("/addUserToGroup", protect, addUserTogroup);
router.delete("/deleteChat", protect, deleteChat);

module.exports = router;
