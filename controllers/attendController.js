const admin = require('../firebase');

// Initialize Firebase Admin (assuming you have a separate initialization file)
const db = admin.firestore();
const userCollection = db.collection('users'); 

exports.createAttendance = async (req, res) => {
    try {
        const { userId, semester, subject, totalClasses, classesAttended } = req.body;

        const attendanceData = {
            semester,
            subject,
            totalClasses,
            classesAttended,
            attendancePercentage: (classesAttended / totalClasses) * 100,
        };

        // Update user document with attendance data (assuming a field for attendance)
        await userCollection.doc(userId).update({
            attendance: admin.firestore.FieldValue.arrayUnion(attendanceData),
        });

        res.json({ message: 'Attendance created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateAttendance = async (req, res) => {
    const { userId, subject, classesAttended, totalClasses } = req.body;

    try {
        // Get user document
        const userDoc = await userCollection.doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentAttendance = userDoc.data().attendance || []; // Handle cases where attendance field might not exist initially

        // Find the existing attendance record for the subject
        const existingRecord = currentAttendance.find((record) => record.subject === subject);

        if (!existingRecord) {
            return res.status(404).json({ message: 'Attendance record not found for this subject' });
        }

        // Validate new totalClasses (should not be less than existing attended classes)
        if (totalClasses < existingRecord.classesAttended) {
            return res.status(400).json({ message: 'New total classes cannot be less than attended classes' });
        }

        const updatedClassesAttended = Math.min(classesAttended, totalClasses); // Prevent exceeding new total
        const updatedPercentage = (updatedClassesAttended / totalClasses) * 100;

        // Update the specific attendance record within the user document
        await userCollection.doc(userId).update({
            attendance: currentAttendance.map((record) =>
                record.subject === subject
                    ? { ...record, classesAttended: updatedClassesAttended, totalClasses, attendancePercentage: updatedPercentage }
                    : record
            ),
        });

        res.json({ message: 'Attendance updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllSubjectsAttendance = async (req, res) => {
    const userId = req.body.userId;

    try {
        const userDoc = await userCollection.doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const attendanceData = userDoc.data().attendance || []; // Handle cases where attendance field might not exist initially

        res.json({ attendance: attendanceData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
