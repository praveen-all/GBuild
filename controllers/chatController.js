const admin = require("../firebase");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = "your_secret_key";
const chatCollection = admin.firestore().collection("chat"); // Access users collection
const userCollection = admin.firestore().collection("users");

const findUser = async (req, res) => {
  const { name } = req.query;
    console.log(name);
  if (!name) {
    return res.status(404).json({
      status: "error",
      message: "please provide name",
    });
  }

  try {
    // const users=await userCollection.where('name','in',name).get();
    const snapshot = await userCollection
      .where("name", ">=", name)
      .where("name", "<=", name + "\uf8ff")
      .get();

    // if (snapshot.empty) {
    //   return res.status(404).json({ error: "No matching documents found" });
    // }

    const documents = [];
    snapshot.forEach((doc) => {
      documents.push({
        username: doc.data().name,
        userId: doc.id,
        email: doc.data().email,
      });
    });

    res.status(200).json({
      status: "success",
      data: documents,
    });
  } catch (error) {
    console.error("Error getting chats:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createChat = async (req, res) => {
  try {
    const { chatname, isGroupChat, userId } = req.body;
    const users = [req.userId, userId];
    // Validate request body
    console.log(req.userId);
    if (!chatname || !users || !Array.isArray(users)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Create a new chat document in Firestore
    const newChatRef = await chatCollection.add({
      chatname,
      isGroupChat: isGroupChat,
      users: users.map((uid) => userCollection.doc(uid)),
    });

    res.status(201).json({ status:"sucess",id: newChatRef.id,message:'chat created success' });
  } catch (error) {
    console.error("Error getting chats:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createGroup = async (req, res) => {
  try {
    const { chatname, isGroupChat, userss } = req.body;
    const users = [req.userId, ...userss];
    const groupAdmin = req.userId;
    // Validate request body
    if (!chatname || !users || !Array.isArray(users)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Create a new chat document in Firestore
    const newChatRef = await chatCollection.add({
      chatname,
      isGroupChat: isGroupChat,
      users: users.map((uid) => userCollection.doc(uid)),
      groupAdmin,
    });

    res.status(201).json({ id: newChatRef.id });
  } catch (error) {
    console.error("Error getting chats:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getChatById = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    console.log(chatId);
    // Get the chat document from Firestore
    const chatDoc = await chatCollection.doc(chatId).get();
    console.log(chatDoc);
    if (!chatDoc.exists) {
      return res.status(404).json({ error: "Chat document not found" });
    }

    // Resolve user references in the chat document
    const chatData = chatDoc.data();
    const usersData = await Promise.all(
      chatData.users.map(async (userRef) => {
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          return {
            name: userDoc.data().name,
            email: userDoc.data().email,
            phoneNumber: userDoc.data().phoneNumber,
            sem: userDoc.data().sem,
          };
        } else {
          return null;
        }
      })
    );

    // Combine chat data with resolved user data
    const chatWithUsers = {
      id: chatDoc.id,
      chatname: chatData.chatname,
      isGroupChat: chatData.isGroupChat,
      users: usersData,
    };

    res.json(chatWithUsers);
  } catch (error) {
    console.error("Error getting chats:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getAllChatbyUserId = async (req, res) => {
  try {
    const userId = req.userId;

    // Query Firestore collection for chats that include the given userId
    const chatsRef = chatCollection.where(
      "users",
      "array-contains",
      userCollection.doc(userId)
    );
    const snapshot = await chatsRef.get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "No chats found for the given userId" });
    }

    const chats = [];
    await Promise.all(
      snapshot.docs.map(async (doc) => {
        const chatData = doc.data();
        const usersData = await Promise.all(
          chatData.users.map(async (userRef) => {
            const userDoc = await userRef.get();
            if (userDoc.exists) {
              return {
                id: userDoc.id,
                ...{
                  email: userDoc.data().email,
                  name: userDoc.data().name,
                  phoneNumber: userDoc.data().phoneNumber,
                },
              };
            } else {
              return null;
            }
          })
        );
        chats.push({ id: doc.id, ...chatData, users: usersData });
      })
    );

    res.status(200).json({
      status: "suceess",
      data: chats,
    });
  } catch (error) {
    console.error("Error getting chats:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateGroupName = async (req, res) => {
  const { chatId, chatname } = req.body;

  if (!chatname) {
    return res.status(401).json({
      status: "fails",
      message: "please provide groupName",
    });
  }
  try {
    const chatRef = chatCollection.doc(chatId);
    await chatRef.update({ chatname });
    //    console.log((await chatRef.get()).data());
    res
      .status(200)
      .json({ status: "sucess", message: "Chatname updated successfully" });
  } catch (error) {
    console.error("Error getting chats:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const addUserTogroup = async (req, res) => {
  try {
    // const chatId = req.params.chatId;
    const { userId, chatId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const chatRef = chatCollection.doc(chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      return res.status(404).json({ error: "Chat document not found" });
    }

    const userRef = userCollection.doc(userId);

    const chatData = chatDoc.data();
    const users = chatData.users || [];
    if (!users.some((user) => user.isEqual(userRef))) {
      users.push(userRef);
      await chatRef.update({ users });
    }

    res.status(200).json({ message: "User added to the group successfully" });
  } catch (error) {
    console.error("Error adding user to group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.body;

    // Check if the chat document exists
    const chatRef = chatCollection.doc(chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      return res.status(404).json({ error: "Chat document not found" });
    }

    // Delete the chat document
    await chatRef.delete();

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  findUser,
  createChat,
  getChatById,
  createGroup,
  getAllChatbyUserId,
  updateGroupName,
  addUserTogroup,
  deleteChat
  
};
