const admin = require('../firebase');

// Initialize Firebase Admin (assuming you have a separate initialization file)
const db = admin.firestore();
const attendanceCollection = db.collection('attend');
 
exports.createAttendance = async (req, res) => {
    try {
        const { userId, semester, subject } = req.body;
        const attendanceData = {
            semester,
            subject,
            totalClasses: 0,
            classesAttended: 0,
            attendancePercentage: 0, // Initialize to 0 for initial creation
        };

        await attendanceCollection.add({ userId, ...attendanceData }); // Add to attendance collection

        res.json({ message: 'Attendance created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateAttendance = async (req, res) => {
    const subjectId = req.params.subjectId;
    const { userId,semester, subject, classesAttended, totalClasses } = req.body;

    try {
        await attendanceCollection.doc(subjectId).update({
            semester,
            subject,
            totalClasses,
            classesAttended,
            attendancePercentage: (classesAttended / totalClasses) * 100})
        res.json({ message: 'Attendance updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllSubjectsAttendance = async (req, res) => {
    const userId = req.params.userId;

    try {
        const attendanceDocs = await attendanceCollection.where('userId', '==', userId).get();

        const attendanceData = attendanceDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        res.json({ attendance: attendanceData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 
