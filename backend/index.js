const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');


const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/projet");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('DB Connected successfully!');
    startServer();
});

function startServer() {
    app.use(cors());
    app.use(bodyParser.json());

    // User model (make sure it matches your schema)
    const User = mongoose.model('User', {
        username: String,
        email: String,
        password: String
    });
// Route to handle signup
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new instance of the User model with the hashed password
        const newUser = new User({ username, email, password: hashedPassword });

        // Save to the database
        const savedUser = await newUser.save();

        console.log('User signed up successfully:', savedUser);
        res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
        console.error('Signup failed:', err);
        res.status(500).json({ error: 'Signup failed' });
    }
});




app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login request received');
        console.log('Email:', email);

        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log('Input Password:', password);
        console.log('Hashed Password from DB:', user.password);

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log('Password does not match');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log('Login successful');
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});





    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
