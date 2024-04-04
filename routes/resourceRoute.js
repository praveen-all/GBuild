const express = require("express");

const { protect } = require("./../middleware/authMiddleware.js");
const { getAll ,add} = require("../controllers/resourceController.js");
const router = express.Router();

router.get("/get", protect, getAll);
router.post("/add", protect,add );

module.exports = router;
