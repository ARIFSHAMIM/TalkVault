const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const dns = require("dns")
dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])

const app = express();
app.use(cors());
app.use(express.json());

// Middleware: JSON data ko read karne ke liye (bahut zaroori hai)
app.use(express.json()); 


const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

// Inko aap Agora Console (agora.io) se free account banakar le sakte hain
const AGORA_APP_ID = process.env.AGORA_APP_ID || "YOUR_AGORA_APP_ID";
const AGORA_APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || "YOUR_AGORA_APP_CERTIFICATE";

// Token Generate karne ka API Route
app.get('/api/agora-token', (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ error: 'channelName is required' });
    }

    // Har user ke liye ek random ID
    const uid = Math.floor(Math.random() * 100000); 
    const role = RtcRole.PUBLISHER;
    
    // Token ki validity (1 ghante ke liye)
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Token Build karna
    const token = RtcTokenBuilder.buildTokenWithUid(
        AGORA_APP_ID,
        AGORA_APP_CERTIFICATE,
        channelName,
        uid,
        role,
        privilegeExpiredTs
    );

    return res.json({ token, uid, channelName });
});

// ==========================================
// 1. DATABASE CONNECTION
// ==========================================
// Apna Mongoose (MongoDB Atlas) wala link yahan double quotes ke andar dalein
 const dbURI = "mongodb+srv://arifshamim0786_db_user:Arifshamim123@cluster0.8hg4wpa.mongodb.net/?appName=Cluster0"

mongoose.connect(dbURI)
  .then(() => console.log("✅ MongoDB Successfully Connected!"))
  .catch((err) => console.log("❌ MongoDB Connection Error: ", err));


// ==========================================
// 2. USER SCHEMA & MODEL
// ==========================================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

// Security Key
const JWT_SECRET = "TalkVault_Super_Secret_Key_2026";


// ==========================================
// 3. APIS (LOGIN & REGISTER)
// ==========================================

// --- Naya Account Banane Ke Liye (REGISTER) ---
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error during registration" });
  }
});

// --- Login Karne Ke Liye (LOGIN) ---
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful!",
      token: token,
      user: { name: user.name, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});


// ==========================================
// 4. SERVER START
// ==========================================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});