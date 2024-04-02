<<<<<<< HEAD
const admin = require('../firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'your_secret_key';
const userCollection = admin.firestore().collection('users'); // Access users collection

async function register(req, res) {
    try {
        const { email, password } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check for existing user
=======
const admin = require('./firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userCollection = admin.firestore().collection('users'); // Access users collection

// User Registration
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash password securely before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

>>>>>>> d60080d9540e70fcf774c95abadbe7fe9561dff7
        const existingUser = await userCollection.where('email', '==', email).get();
        if (!existingUser.empty) {
            return res.status(400).json({ message: 'Email already in use' });
        }

<<<<<<< HEAD
        // Create new user
=======
>>>>>>> d60080d9540e70fcf774c95abadbe7fe9561dff7
        const newUser = await userCollection.add({ email, hashedPassword });

        res.json({ message: 'User registered successfully!', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
<<<<<<< HEAD
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user
=======
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
>>>>>>> d60080d9540e70fcf774c95abadbe7fe9561dff7
        const userDoc = await userCollection.where('email', '==', email).get();
        if (userDoc.empty) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = userDoc.docs[0].data();
        const validPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

<<<<<<< HEAD
        // Generate JWT token
=======
        // Generate JWT token with user ID
>>>>>>> d60080d9540e70fcf774c95abadbe7fe9561dff7
        const token = jwt.sign({ userId: userDoc.docs[0].id }, secret, { expiresIn: '1h' });

        res.json({ message: 'Login successful!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
<<<<<<< HEAD
}
=======
});
>>>>>>> d60080d9540e70fcf774c95abadbe7fe9561dff7

module.exports = { register, login };