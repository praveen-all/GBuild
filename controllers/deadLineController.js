const admin = require("../firebase");

const db = admin.firestore();
const deadlineCollection = db.collection('deadlines');

exports.addDeadline = async (req, res) => {
    try {
        const { userId, taskName, deadlineDate } = req.body;

        const deadline = {
            taskName,
            deadlineDate,
            completed: false, 
        };

        await deadlineCollection.add({ userId, ...deadline }); // Add to deadline collection

        res.json({ message: 'Deadline added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getTodaysDeadlines = async (req, res) => {
    const userId = req.params.userId;

    try {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because month is zero-based
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const deadlineQuery = deadlineCollection
            .where('userId', '==', userId)
            .where('deadlineDate','==',formattedDate)

        const deadlineDocs = await deadlineQuery.get();

        const todaysDeadlines = deadlineDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        res.json({ deadlines: todaysDeadlines });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteDeadline = async (req, res) => {
    const deadlineId = req.params.deadlineId;

    try {
        // Validate presence of deadlineId
        if (!deadlineId) {
            return res.status(400).json({ message: 'Missing deadline ID' });
        }

        // Delete the deadline document by its ID
        await deadlineCollection.doc(deadlineId).delete();

        res.json({ message: 'Deadline deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
