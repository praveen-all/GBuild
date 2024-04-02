const admin = require("../firebase");

const attendCollection = admin.firestore().collection("attendence");

const createAt=async (req, res) => {
  try {
    const {  sem, subjects } = req.body;

    
    const docRef = attendCollection.doc();


    await docRef.set({
      userId:req.userId,
      sem,
      subjects: subjects.reduce(
        (acc, subject) => ({ ...acc, [subject]: [] }),
        {}
      ),
    });

    res.status(201).send("Document created successfully!");
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).send("Error creating document");
  }
};


const getBysem = async (req, res) => {
  try {
    const { sem } = req.body;

    // Query Firestore collection
    const snapshot = await attendCollection
      .where("userId", "==", req.userId)
      .where("sem", "==", sem)
      .get();

    const attendanceData = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      attendanceData.push({
        id: doc.id,
        userId: data.userId,
        sem: data.sem,
        subjects: data.subjects,
      });
    });

    res.status(200).json(attendanceData);
  } catch (error) {
    console.error("Error getting attendance data:", error);
    res.status(500).send("Error getting attendance data");
  }
};



const update=async (req, res) => {
  try {
    const {  sem, subject, attendance } = req.body;

    const querySnapshot = await attendCollection
      .where('userId', '==', req.userId)
      .where('sem', '==', sem)
      .get();

    const updatePromises = [];
    querySnapshot.forEach(doc => {
      const docRef = attendCollection.doc(doc.id);
      updatePromises.push(docRef.update({
        [`subjects.${subject}`]: admin.firestore.FieldValue.arrayUnion(attendance)
      }));
    });

    await Promise.all(updatePromises);

    res.status(200).send('Attendance data updated successfully!');
  } catch (error) {
    console.error('Error updating attendance data:', error);
    res.status(500).send('Error updating attendance data');
  }
};


module.exports = { createAt, getBysem, update };