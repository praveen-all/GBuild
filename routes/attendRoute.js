const express = require('express');
const attendanceController = require('../controllers/attendController');

const router = express.Router();

router.post('/', attendanceController.createAttendance);
router.put('/:subjectId', attendanceController.updateAttendance);
router.get('/:userId', attendanceController.getAllSubjectsAttendance);

module.exports = router;
