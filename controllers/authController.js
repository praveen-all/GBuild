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

        const existingUser = await userCollection.where('email', '==', email).get();
        if (!existingUser.empty) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = await userCollection.add({ email, hashedPassword });

        res.json({ message: 'User registered successfully!', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await userCollection.where('email', '==', email).get();
        if (userDoc.empty) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = userDoc.docs[0].data();
        const validPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token with user ID
        const token = jwt.sign({ userId: userDoc.docs[0].id }, secret, { expiresIn: '1h' });

        res.json({ message: 'Login successful!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { register, login };