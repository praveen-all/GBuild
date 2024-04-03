const express = require('express');
const attendanceController = require('../controllers/attendController');

const router = express.Router();

router.post('/', attendanceController.createAttendance);
router.put('/', attendanceController.updateAttendance);
router.get('/', attendanceController.getAllSubjectsAttendance);

module.exports = router;
