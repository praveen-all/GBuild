const express = require("express");
const { createAt, getBysem ,update} = require("../controllers/attendenceController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/create", protect,createAt);
router.get("/get", protect,getBysem);
router.put("/update", protect,update);

module.exports = router;
