const admin = require("../firebase");

const chatCollection = admin.firestore().collection("chat");
const userCollection = admin.firestore().collection("users");
const messageCollection = admin.firestore().collection("message");

const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    const sender = req.userId;

    if (!chatId || !content || !sender) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Create a new message document in Firestore
    const newMessageRef = await messageCollection.add({
      chatId,
      content,
      sender,
    });

    res.status(201).json({ id: newMessageRef.id });
  } catch (error) {
    console.error("Error creating message document:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllMsg = async (req, res) => {
  const { chatId } = req.body;
  if (!chatId) {
    res.status(401).json("plese provide the chatId");
  }

  try {
    const allmesg = await messageCollection.where("chatId", "==", chatId).get();
    // console.log(allmesg.docs);
    const data = allmesg.docs.map((el) => el.data());

    // console.log(data);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};




module.exports = { sendMessage, getAllMsg };
