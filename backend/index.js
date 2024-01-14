const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

     // Schema pour l'image dans MongoDB
     const ImageSchema = new mongoose.Schema({
        data: Buffer,
        contentType: String,
    });

    const User = mongoose.model('User', {
        username: String,
        email: String,
        password: String,
        profile: {
            photo: String, // Ajoutez ce champ pour stocker le chemin de la photo de profil
            project: String,
        },
    });

    
    const Image = mongoose.model('Image', ImageSchema);


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
        res.json({ message: 'Login successful' });} catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

//// logout route
app.post('/logout', (req, res) => {
    console.log('Logout request received');
    try {
        // Your logout logic here
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
});

///contact us 

// Middleware pour traiter les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurer le transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nbenjannena@gmail.com',
    pass: 'nyqr ybjb oiwq bwdq'
  }
});

// Définir une route pour traiter les données du formulaire
app.post('/contact', (req, res) => {
  const { email, object, subject } = req.body;

  const mailOptions = {
    from: 'nbenjannena@gmail.com',
    to: 'nbenjannena@gmail.com',
    subject: 'Feedback: ' + object,
    text: `Email Address: ${email}\n\n${subject}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});



/// profile settings 



app.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Mise à jour du chemin de la photo de profil dans la base de données
        user.profile.photo = req.file.buffer.toString('base64');
        await user.save();

        res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Image upload failed:', error);
        res.status(500).json({ error: 'Image upload failed' });
    }
});

///// route pour récupérer la photo de profil


app.get('/profile/photo/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user || !user.profile.photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        // Retourner la photo en base64
        res.json({ photo: user.profile.photo });
    } catch (error) {
        console.error('Error fetching profile photo:', error);
        res.status(500).json({ error: 'Error fetching profile photo' });
    }
});


app.put('/profile', upload.single('photo'), async (req, res) => {
    try {
        // Obtenez les données du formulaire
        const { username, email, project } = req.body;

        // Mettez à jour le profil dans la base de données
        const updatedUser = await User.findOneAndUpdate(
            { email: email }, // ou toute autre condition pour identifier l'utilisateur
            { $set: { username: username, 'profile.project': project } },
            { new: true } // renvoie le document mis à jour
        );

        // Si une nouvelle photo est téléchargée, enregistrez-la
        if (req.file) {
            const newPhoto = new Image({
                data: req.file.buffer,
                contentType: req.file.mimetype
            });

            const savedPhoto = await newPhoto.save();
            updatedUser.profile.photo = savedPhoto._id;
            await updatedUser.save();
        }

        console.log('Profile updated successfully:', updatedUser);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update failed:', error);
        res.status(500).json({ error: 'Profile update failed' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'username'); // Corrected from 'users.find'
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}