const express = require('express');
const fTrackerController = require('../controllers/fTrackerController');

const router = express.Router();

router.post('/', fTrackerController.addExpense);
router.get('/',  fTrackerController.getExpenses);
router.put('/:expenseId',  fTrackerController.updateExpense);
router.delete('/:expenseId', fTrackerController.deleteExpense);

module.exports = router;