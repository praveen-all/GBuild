const admin = require("../firebase");

const resourceCollection = admin.firestore().collection("resource");

const add = async (req, res) => {
  try {
    const {  title, url } = req.body;
    const userId=req.userId;
     if(!title || !url ||!userId){
        res.status(401).json({ message: "please provide information" });
     }
    // Add document to Firestore collection
    const docRef = await resourceCollection.add({
      userId,
      title,
      url,
    });

    res
      .status(201)
      .json({ message: "Document created successfully", docId: docRef.id });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ error: "Failed to create document" });
  }
};

const getAll = async (req, res) => {
  try {
    const snapshot = await resourceCollection.where('userId','==',req.userId).get();
    const documents = [];

    snapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(documents);
  } catch (error) {
    console.error("Error getting documents:", error);
    res.status(500).json({ error: "Failed to get documents" });
  }
};


module.exports = { getAll, add };
