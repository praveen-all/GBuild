const admin = require("../firebase");

const db = admin.firestore();
const expenseCollection = db.collection('expenses');

exports.addExpense = async (req, res) => {
    try {
        const { userId, amount, category } = req.body;
        const newExpense = await expenseCollection.add({
            userId,
            amount,
            category,
            createdAt: admin.firestore.Timestamp.now(),
        });
        res.json({ message: 'Expense added successfully!', expenseId: newExpense.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getExpenses = async (req, res) => {
    const userId = req.params.userId;

    try {
        const expenses = await expenseCollection.where('userId', '==', userId).get();
        const expenseData = expenses.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        res.json({ expenses: expenseData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateExpense = async (req, res) => {
    const expenseId = req.params.expenseId;
    const { amount, category } = req.body;

    try {
        await expenseCollection.doc(expenseId).update({ amount, category });
        res.json({ message: 'Expense updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.expenseId;

    try {
        await expenseCollection.doc(expenseId).delete();
        res.json({ message: 'Expense deleted successfully!' });
    } catch (error) {
        console.error(error);
        // Handle specific errors like "not found" appropriately (optional)
        res.status(500).json({ message: 'Internal server error' });
    }
};

