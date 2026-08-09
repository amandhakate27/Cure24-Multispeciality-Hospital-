const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const gridfs = require('./gridfs');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV || 'development';

const ADMIN_EFFECTIVE_HASH =
    ADMIN_PASSWORD_HASH || (ADMIN_PASSWORD ? bcrypt.hashSync(ADMIN_PASSWORD, 10) : null);

const requiredEnv = [
    ["JWT_SECRET", JWT_SECRET],
    ["ADMIN_USERNAME", ADMIN_USERNAME],
    ["ADMIN_PASSWORD or ADMIN_PASSWORD_HASH", ADMIN_EFFECTIVE_HASH],
    ["MONGO_URI", MONGO_URI],
].filter(([, value]) => !value);

if (requiredEnv.length > 0) {
    console.error(
        "Missing required environment variables:",
        requiredEnv.map(([name]) => name).join(", ")
    );
    process.exit(1);
}

const WEAK_SECRETS = [
    'change-this-to-a-strong-secret',
    'your_super_secret_jwt_key_change_this_in_production',
    'secret',
];

if (NODE_ENV === 'production' && WEAK_SECRETS.includes(JWT_SECRET)) {
    console.error(
        'Refusing to start in production: JWT_SECRET is a known weak/default value. ' +
        'Set a strong random secret and NODE_ENV=production on your host.'
    );
    process.exit(1);
}

// Security Middleware
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "connect-src": [
                    "'self'",
                    "http://localhost:5000",
                    "http://localhost:5173",
                    "https://apligrampanchayat.in",
                    "https://www.apligrampanchayat.in",
                    "https://cure24hospital.onrender.com"
                ],
                "img-src": [
                    "'self'",
                    "data:",
                    "blob:",
                    "http://localhost:5000",
                    "http://localhost:5173",
                    "https://apligrampanchayat.in",
                    "https://www.apligrampanchayat.in",
                    "https://cure24hospital.onrender.com"
                ],
                "media-src": [
                    "'self'",
                    "data:",
                    "blob:",
                    "http://localhost:5000",
                    "http://localhost:5173",
                    "https://apligrampanchayat.in",
                    "https://www.apligrampanchayat.in",
                    "https://cure24hospital.onrender.com"
                ],
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
        console.log('Connected to MongoDB');
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

const feedbackSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 120 },
        email: { type: String, trim: true, maxlength: 200 },
        phone: { type: String, required: true, trim: true, maxlength: 20 },
        subject: { type: String, required: true, trim: true, maxlength: 200 },
        message: { type: String, required: true, trim: true, maxlength: 2000 },
        showOnTestimonials: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Hero Slider Schema
const heroSliderSchema = new mongoose.Schema(
    {
        imageUrl: { type: String, required: true },
        altText: { type: String, default: 'Hero slider image' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const HeroSlider = mongoose.model('HeroSlider', heroSliderSchema);

// Gallery Photo Schema
const galleryPhotoSchema = new mongoose.Schema(
    {
        imageUrl: { type: String, required: true },
        title: { type: String, default: 'Gallery photo' },
        isActive: { type: Boolean, default: true },
        showOnHome: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const GalleryPhoto = mongoose.model('GalleryPhoto', galleryPhotoSchema);

// Video Schema
const videoSchema = new mongoose.Schema(
    {
        videoUrl: { type: String, required: true },
        title: { type: String, default: 'Hospital Video' },
        description: { type: String, default: '' },
        useInVideosSection: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);

const getRequestBaseUrl = (req) => {
    const configuredBase = process.env.PUBLIC_API_URL || process.env.API_PUBLIC_URL;
    if (configuredBase) return configuredBase.replace(/\/$/, '');
    return `${req.protocol}://${req.get('host')}`;
};

const serializeHeroSlide = (slide, req) => {
    const data = typeof slide.toObject === 'function' ? slide.toObject() : { ...slide };
    if (data.imageUrl && !/^https?:\/\//i.test(data.imageUrl)) {
        data.imageUrl = `${getRequestBaseUrl(req)}${data.imageUrl}`;
    }
    return data;
};

const serializeGalleryPhoto = (photo, req) => {
    const data = typeof photo.toObject === 'function' ? photo.toObject() : { ...photo };
    if (data.imageUrl && !/^https?:\/\//i.test(data.imageUrl)) {
        data.imageUrl = `${getRequestBaseUrl(req)}${data.imageUrl}`;
    }
    return data;
};

const serializeVideo = (video, req) => {
    const data = typeof video.toObject === 'function' ? video.toObject() : { ...video };
    if (data.videoUrl && !/^https?:\/\//i.test(data.videoUrl)) {
        data.videoUrl = `${getRequestBaseUrl(req)}${data.videoUrl}`;
    }
    return data;
};

// Multer config for hero slider uploads (in-memory, stored via GridFS)
const heroSliderUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'));
        }
        cb(null, true);
    },
});

// Multer config for video uploads (in-memory, stored via GridFS)
const videoUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('video/')) {
            return cb(new Error('Only video files are allowed'));
        }
        cb(null, true);
    },
});

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
app.get("/api/health", (req, res) => {
    res.json({ success: true, status: "ok" });
});

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
        const { name, phone, email, date, time, department, doctor, message } = req.body || {};

        if (!name || !phone || !date || !time || !department) {
            return res.status(400).json({
                success: false,
                message: 'Name, phone, date, time and department are required',
            });
        }

        const appointment = await Appointment.create({
            name: String(name).trim().slice(0, 120),
            phone: String(phone).trim().slice(0, 20),
            email: email ? String(email).trim().slice(0, 200) : undefined,
            date: String(date).trim().slice(0, 20),
            time: String(time).trim().slice(0, 20),
            department: String(department).trim().slice(0, 120),
            doctor: doctor ? String(doctor).trim().slice(0, 120) : undefined,
            message: message ? String(message).trim().slice(0, 2000) : undefined,
        });

        res.status(201).json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create feedback (public)
app.post('/api/feedback', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body || {};

        if (!name || !phone || !subject || !message) {
            return res
                .status(400)
                .json({ success: false, message: 'Name, phone, subject and message are required' });
        }

        const feedback = await Feedback.create({
            name,
            email,
            phone,
            subject,
            message,
        });

        return res.status(201).json({ success: true, feedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
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

// Get feedback (admin)
app.get('/api/feedback', authenticate, async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        return res.json({ success: true, feedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Get testimonials (public)
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Feedback.find({ showOnTestimonials: true })
            .sort({ createdAt: -1 })
            .select('name message createdAt');

        return res.json({ success: true, testimonials });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Get hero slider images (public - for frontend)
app.get('/api/hero-slider', async (req, res) => {
    try {
        const slides = await HeroSlider.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        return res.json({ success: true, slides: slides.map((slide) => serializeHeroSlide(slide, req)) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Get all hero slider images (admin)
app.get('/api/admin/hero-slider', authenticate, async (req, res) => {
    try {
        const slides = await HeroSlider.find().sort({ order: 1, createdAt: 1 });
        return res.json({ success: true, slides: slides.map((slide) => serializeHeroSlide(slide, req)) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Upload hero slider image (admin)
app.post('/api/admin/hero-slider', authenticate, heroSliderUpload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const { altText, isActive, order } = req.body;

        // Compress & resize image with sharp for faster delivery
        const ext = path.extname(req.file.originalname).toLowerCase();
        const isWebCompatible = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        let buffer = req.file.buffer;
        let finalFilename = `hero_${Date.now()}${ext || '.png'}`;

        if (isWebCompatible) {
            finalFilename = finalFilename.replace(/\.[^.]+$/, '.webp');
            buffer = await sharp(req.file.buffer)
                .resize({ width: 1920, withoutEnlargement: true })
                .webp({ quality: 82 })
                .toBuffer();
        }

        const uploaded = await gridfs.uploadBuffer(
            gridfs.HERO_BUCKET,
            buffer,
            finalFilename,
            isWebCompatible ? 'image/webp' : req.file.mimetype
        );

        const maxOrderSlide = await HeroSlider.findOne().sort({ order: -1 });
        const nextOrder = maxOrderSlide ? maxOrderSlide.order + 1 : 0;
        const activeValue = isActive === undefined ? true : (isActive === 'true' || isActive === true);

        const slide = await HeroSlider.create({
            imageUrl: `/media/hero/${uploaded._id}`,
            altText: altText || 'Hero slider image',
            isActive: activeValue,
            order: order !== undefined ? Number(order) : nextOrder,
        });

        return res.status(201).json({ success: true, slide: serializeHeroSlide(slide, req) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Update hero slider image (admin)
app.patch('/api/admin/hero-slider/:id', authenticate, async (req, res) => {
    try {
        const { altText, isActive, order } = req.body;
        const slide = await HeroSlider.findByIdAndUpdate(
            req.params.id,
            {
                ...(altText !== undefined && { altText }),
                ...(isActive !== undefined && { isActive: Boolean(isActive) }),
                ...(order !== undefined && { order: Number(order) }),
            },
            { new: true, runValidators: true }
        );

        if (!slide) {
            return res.status(404).json({ success: false, message: 'Slide not found' });
        }

        return res.json({ success: true, slide: serializeHeroSlide(slide, req) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Delete hero slider image (admin)
app.delete('/api/admin/hero-slider/:id', authenticate, async (req, res) => {
    try {
        const slide = await HeroSlider.findByIdAndDelete(req.params.id);
        if (!slide) {
            return res.status(404).json({ success: false, message: 'Slide not found' });
        }

        const fileId = gridfs.getFileIdFromUrl(slide.imageUrl);
        if (fileId) {
            await gridfs.deleteFile(gridfs.HERO_BUCKET, fileId);
        }

        const legacyPath = path.join(__dirname, slide.imageUrl);
        if (fs.existsSync(legacyPath)) {
            fs.unlinkSync(legacyPath);
        }

        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// --- GALLERY PHOTOS ENDPOINTS ---

// Get gallery photos (public - for photo gallery page and home gallery)
app.get('/api/gallery-photos', async (req, res) => {
    try {
        const filter = req.query.home === 'true' ? { isActive: true, showOnHome: true } : { isActive: true };
        const photos = await GalleryPhoto.find(filter).sort({ order: 1, createdAt: 1 });
        return res.json({ success: true, photos: photos.map((p) => serializeGalleryPhoto(p, req)) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Get all gallery photos (admin)
app.get('/api/admin/gallery-photos', authenticate, async (req, res) => {
    try {
        const photos = await GalleryPhoto.find().sort({ order: 1, createdAt: 1 });
        return res.json({ success: true, photos: photos.map((p) => serializeGalleryPhoto(p, req)) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Upload gallery photo (admin)
app.post('/api/admin/gallery-photos', authenticate, heroSliderUpload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const { title, isActive, order } = req.body;

        // Compress & resize image with sharp for faster delivery
        const ext = path.extname(req.file.originalname).toLowerCase();
        const isWebCompatible = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        let buffer = req.file.buffer;
        let finalFilename = `gallery_${Date.now()}${ext || '.png'}`;

        if (isWebCompatible) {
            finalFilename = finalFilename.replace(/\.[^.]+$/, '.webp');
            buffer = await sharp(req.file.buffer)
                .resize({ width: 1600, withoutEnlargement: true })
                .webp({ quality: 82 })
                .toBuffer();
        }

        const uploaded = await gridfs.uploadBuffer(
            gridfs.GALLERY_BUCKET,
            buffer,
            finalFilename,
            isWebCompatible ? 'image/webp' : req.file.mimetype
        );

        const maxOrderPhoto = await GalleryPhoto.findOne().sort({ order: -1 });
        const nextOrder = maxOrderPhoto ? maxOrderPhoto.order + 1 : 0;
        const activeValue = isActive === undefined ? true : (isActive === 'true' || isActive === true);

        const photo = await GalleryPhoto.create({
            imageUrl: `/media/gallery/${uploaded._id}`,
            title: title || 'Gallery photo',
            isActive: activeValue,
            order: order !== undefined ? Number(order) : nextOrder,
        });

        return res.status(201).json({ success: true, photo: serializeGalleryPhoto(photo, req) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Update gallery photo (admin)
app.patch('/api/admin/gallery-photos/:id', authenticate, async (req, res) => {
    try {
        const { title, isActive, order, showOnHome } = req.body;
        const photo = await GalleryPhoto.findByIdAndUpdate(
            req.params.id,
            {
                ...(title !== undefined && { title }),
                ...(isActive !== undefined && { isActive: Boolean(isActive) }),
                ...(order !== undefined && { order: Number(order) }),
                ...(showOnHome !== undefined && { showOnHome: Boolean(showOnHome) }),
            },
            { new: true, runValidators: true }
        );

        if (!photo) {
            return res.status(404).json({ success: false, message: 'Photo not found' });
        }

        return res.json({ success: true, photo: serializeGalleryPhoto(photo, req) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Delete gallery photo (admin)
app.delete('/api/admin/gallery-photos/:id', authenticate, async (req, res) => {
    try {
        const photo = await GalleryPhoto.findByIdAndDelete(req.params.id);
        if (!photo) {
            return res.status(404).json({ success: false, message: 'Photo not found' });
        }

        const fileId = gridfs.getFileIdFromUrl(photo.imageUrl);
        if (fileId) {
            await gridfs.deleteFile(gridfs.GALLERY_BUCKET, fileId);
        }

        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// --- VIDEOS ENDPOINTS ---

// Get active videos (public - for website video section)
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await Video.find({ useInVideosSection: true }).sort({ order: 1, createdAt: -1 });
        return res.json({ success: true, videos: videos.map((v) => serializeVideo(v, req)) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Get all videos (admin)
app.get('/api/admin/videos', authenticate, async (req, res) => {
    try {
        const videos = await Video.find().sort({ order: 1, createdAt: -1 });
        return res.json({ success: true, videos: videos.map((v) => serializeVideo(v, req)) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Upload video (admin)
app.post('/api/admin/videos', authenticate, videoUpload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Video file is required' });
        }

        const { title, description, useInVideosSection } = req.body;
        const maxOrderVideo = await Video.findOne().sort({ order: -1 });
        const nextOrder = maxOrderVideo ? maxOrderVideo.order + 1 : 0;
        const activeValue = useInVideosSection === undefined ? true : (useInVideosSection === 'true' || useInVideosSection === true);

        const filename = `vid_${Date.now()}${path.extname(req.file.originalname) || '.mp4'}`;
        const uploaded = await gridfs.uploadBuffer(
            gridfs.VIDEO_BUCKET,
            req.file.buffer,
            filename,
            req.file.mimetype || 'video/mp4'
        );

        const video = await Video.create({
            videoUrl: `/media/video/${uploaded._id}`,
            title: title || 'Hospital Video',
            description: description || '',
            useInVideosSection: activeValue,
            order: nextOrder,
        });

        return res.status(201).json({ success: true, video: serializeVideo(video, req) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Update video (admin)
app.patch('/api/admin/videos/:id', authenticate, async (req, res) => {
    try {
        const { title, description, useInVideosSection } = req.body;
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(useInVideosSection !== undefined && { useInVideosSection: Boolean(useInVideosSection) }),
            },
            { new: true, runValidators: true }
        );

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        return res.json({ success: true, video: serializeVideo(video, req) });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Delete video (admin)
app.delete('/api/admin/videos/:id', authenticate, async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        const fileId = gridfs.getFileIdFromUrl(video.videoUrl);
        if (fileId) {
            await gridfs.deleteFile(gridfs.VIDEO_BUCKET, fileId);
        }

        const legacyPath = path.join(__dirname, video.videoUrl);
        if (fs.existsSync(legacyPath)) {
            fs.unlinkSync(legacyPath);
        }

        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Toggle feedback testimonial visibility (admin)
app.patch('/api/feedback/:id/testimonial', authenticate, async (req, res) => {
    try {
        const { showOnTestimonials } = req.body;
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { showOnTestimonials: Boolean(showOnTestimonials) },
            { new: true, runValidators: true }
        );

        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }

        return res.json({ success: true, feedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Delete feedback (admin)
app.delete('/api/feedback/:id', authenticate, async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update appointment status
app.patch('/api/appointments/:id', authenticate, async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.json({ success: true, appointment });
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

// GridFS media streaming (hero images + videos) - Range request aware
app.get('/media/hero/:id', (req, res) => gridfs.streamFile(req, res, gridfs.HERO_BUCKET, req.params.id));
app.get('/media/video/:id', (req, res) => gridfs.streamFile(req, res, gridfs.VIDEO_BUCKET, req.params.id));
app.get('/media/gallery/:id', (req, res) => gridfs.streamFile(req, res, gridfs.GALLERY_BUCKET, req.params.id));

// Serve uploads with explicit CORS, CORP and aggressive cache headers
app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Cache images for 30 days, videos for 7 days in browser
    const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(req.path);
    res.setHeader(
        'Cache-Control',
        isVideo ? 'public, max-age=604800' : 'public, max-age=2592000, immutable'
    );
    next();
}, express.static(path.join(__dirname, 'uploads'), {
    etag: true,
    lastModified: true,
}));


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
