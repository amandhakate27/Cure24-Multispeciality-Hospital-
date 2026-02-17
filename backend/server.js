const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const MONGO_URI = process.env.MONGO_URI;

const ADMIN_EFFECTIVE_HASH =
    ADMIN_PASSWORD_HASH || (ADMIN_PASSWORD ? bcrypt.hashSync(ADMIN_PASSWORD, 10) : null);


// Security Middleware


app.disable('x-powered-by');
app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "frame-src": ["'self'", "https://www.google.com"],
                "child-src": ["'self'", "https://www.google.com"],
            },
        },
    })
);

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
});

app.use('/api', apiLimiter);

// Database


const connectToDatabase = async () => {
    if (!MONGO_URI) {
        console.error('Missing MONGO_URI');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};


// Schema


const appointmentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        date: { type: String, required: true },
        time: { type: String, required: true },
        department: { type: String, required: true },
        doctor: String,
        message: String,
        status: { type: String, default: 'pending' },
    },
    { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);


// Helpers


const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};


// API Routes


// Admin login
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    if (
        username === ADMIN_USERNAME &&
        ADMIN_EFFECTIVE_HASH &&
        bcrypt.compareSync(password || '', ADMIN_EFFECTIVE_HASH)
    ) {
        const token = jwt.sign(
            { sub: ADMIN_USERNAME, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.json({
            success: true,
            token,
        });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Create appointment
app.post('/api/appointments', async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get appointments (admin)
app.get('/api/appointments', authenticate, async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete appointment
app.delete('/api/appointments/:id', authenticate, async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server after connecting to database
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
