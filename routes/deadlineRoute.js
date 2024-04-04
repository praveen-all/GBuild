const express = require('express');
const deadlineController = require('../controllers/deadLineController.js');

const router = express.Router();

router.post('/', deadlineController.addDeadline);
router.get('/today/:userId', deadlineController.getTodaysDeadlines);
router.delete('/:deadlineId',deadlineController.deleteDeadline)

module.exports = router;
