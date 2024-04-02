const express = require("express");
const { getSemTest,addTheTest } = require("../controllers/testScoreController.js");
const {protect}=require('./../middleware/authMiddleware.js')
const router = express.Router();

router.get("/getSemTest",protect, getSemTest);
router.post("/add",addTheTest );

module.exports = router;
