const admin = require("../firebase");

const db = admin.firestore();
const deadlineCollection = db.collection('deadlines');
const userCollection = db.collection('users'); 

exports.addDeadline = async (req, res) => {
    try {
        const { userId, taskName, deadlineDate } = req.body;
        const parsedDeadline = new Date(deadlineDate); // Parse deadline string to Date object

        // Validate deadline date (optional)
        if (parsedDeadline < new Date()) {
            return res.status(400).json({ message: 'Deadline cannot be in the past' });
        }

        const deadline = {
            taskName,
            deadlineDate: admin.firestore.Timestamp.fromDate(parsedDeadline), // Convert to Firestore Timestamp
            completed: false, // Add a field to track completion status (optional)
        };

        await deadlineCollection.add({ userId, ...deadline }); // Add deadline to separate deadlines collection

        res.json({ message: 'Deadline added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getTodaysDeadlines = async (req, res) => {
    const userId = req.body.userId; // Assuming user ID is sent in the request body

    try {
        const today = new Date().toDateString();

        // Get deadlines from user document (optional, if storing deadlines there)
        const userDoc = await userCollection.doc(userId).get();
        const userDeadlines = userDoc.exists ? userDoc.data().deadlines || [] : [];

        // Get deadlines from deadlines collection
        const deadlineDocs = await deadlineCollection
            .where('userId', '==', userId)
            .where('deadlineDate', '==', admin.firestore.Timestamp.fromDate(new Date(today)))
            .get();

        const todaysDeadlines = deadlineDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        res.json({ deadlines: [...userDeadlines, ...todaysDeadlines] }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};