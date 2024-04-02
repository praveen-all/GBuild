<<<<<<< HEAD
const admin = require('firebase-admin');

const serviceAccount = require('./key.json'); // Replace with actual path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
=======
const admin = require("firebase-admin");

const serviceAccount = require("./key.json"); 
// Replace with actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
>>>>>>> d60080d9540e70fcf774c95abadbe7fe9561dff7
});

module.exports = admin;
