const admin = require("firebase-admin");

const serviceAccount = require("./key.json"); 
// Replace with actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
