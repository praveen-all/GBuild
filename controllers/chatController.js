const admin = require("../firebase");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = "your_secret_key";
const userCollection = admin.firestore().collection("chat"); // Access users collection
