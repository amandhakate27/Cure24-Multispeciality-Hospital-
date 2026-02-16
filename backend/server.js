const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
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

// Middleware
app.disable('x-powered-by');
app.use(helmet());

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    })
);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api', apiLimiter);

// Database
const connectToDatabase = async () => {
    if (!MONGO_URI) {
        console.error('Missing MONGO_URI in environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

const appointmentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        date: { type: String, required: true },
        time: { type: String, required: true },
        department: { type: String, required: true },
        doctor: { type: String },
        message: { type: String },
        status: { type: String, default: 'pending' },
    },
    { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Helpers
const requireConfig = () => {
    return JWT_SECRET && ADMIN_USERNAME && ADMIN_EFFECTIVE_HASH;
};

const sanitizeString = (value, max = 200) => {
    return String(value || '').trim().slice(0, max);
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const authenticate = (req, res, next) => {
    if (!JWT_SECRET) {
        return res.status(500).json({
            success: false,
            message: 'Server misconfigured',
        });
    }

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

// Routes

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Cure24 Hospital API is running', status: 'OK' });
});

// Admin login
app.post('/api/admin/login', loginLimiter, (req, res) => {
    const { username, password } = req.body;

    if (!requireConfig()) {
        return res.status(500).json({
            success: false,
            message: 'Server misconfigured',
        });
    }

    if (username === ADMIN_USERNAME && bcrypt.compareSync(password || '', ADMIN_EFFECTIVE_HASH)) {
        const token = jwt.sign(
            { sub: ADMIN_USERNAME, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
        res.json({
            success: true,
            message: 'Login successful',
            token,
            tokenType: 'Bearer',
            expiresIn: 7200,
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

// Get all appointments (admin only)
app.get('/api/appointments', authenticate, (req, res) => {
    Appointment.find()
        .sort({ createdAt: -1 })
        .lean()
        .then((appointments) => {
            res.json({
                success: true,
                count: appointments.length,
                appointments,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch appointments',
                error: error.message,
            });
        });
});

// Create new appointment
app.post('/api/appointments', (req, res) => {
    const requiredFields = ['name', 'phone', 'date', 'time', 'department'];
    const missing = requiredFields.filter((field) => !req.body[field]);

    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Missing required fields: ${missing.join(', ')}`,
        });
    }

    const appointment = {
        name: sanitizeString(req.body.name, 80),
        phone: sanitizeString(req.body.phone, 30),
        email: sanitizeString(req.body.email, 120),
        date: sanitizeString(req.body.date, 20),
        time: sanitizeString(req.body.time, 20),
        department: sanitizeString(req.body.department, 60),
        doctor: sanitizeString(req.body.doctor, 80),
        message: sanitizeString(req.body.message, 500),
        status: 'pending',
    };

    Appointment.create(appointment)
        .then((saved) => {
            res.status(201).json({
                success: true,
                message: 'Appointment booked successfully',
                appointment: saved,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Failed to save appointment',
                error: error.message,
            });
        });
});

// Delete appointment (admin only)
app.delete('/api/appointments/:id', authenticate, (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid appointment id',
        });
    }

    Appointment.findByIdAndDelete(id)
        .then((deleted) => {
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Appointment not found',
                });
            }
            return res.json({
                success: true,
                message: 'Appointment deleted successfully',
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Failed to delete appointment',
                error: error.message,
            });
        });
});

// Update appointment status (admin only)
app.patch('/api/appointments/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid appointment id',
        });
    }

    Appointment.findByIdAndUpdate(
        id,
        { status: sanitizeString(status, 30) },
        { new: true }
    )
        .then((updated) => {
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: 'Appointment not found',
                });
            }
            return res.json({
                success: true,
                message: 'Appointment updated successfully',
                appointment: updated,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Failed to update appointment',
                error: error.message,
            });
        });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start server
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Cure24 Hospital API server is running on port ${PORT}`);
        console.log(`URL: http://localhost:${PORT}`);
    });
});
