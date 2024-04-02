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
        const existingUser = await userCollection.where('email', '==', email).get();
        if (!existingUser.empty) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user
        const newUser = await userCollection.add({ email, hashedPassword });

        res.json({ message: 'User registered successfully!', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user
        const userDoc = await userCollection.where('email', '==', email).get();
        if (userDoc.empty) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = userDoc.docs[0].data();
        const validPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: userDoc.docs[0].id }, secret, { expiresIn: '1h' });

        res.json({ message: 'Login successful!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { register, login };