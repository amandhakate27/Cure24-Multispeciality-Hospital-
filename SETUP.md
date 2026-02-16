#  Quick Setup Guide

## Step 1: Create Environment Files

### Backend Environment File
Create a file named `.env` in the `backend` folder:

```bash
cd backend
```

Create `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cure24
JWT_SECRET=supersecretjwtkey123456789012345
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Frontend Environment File
Create a file named `.env.local` in the `frontend` folder:

```bash
cd frontend
```

Create `.env.local`:
```
VITE_API_BASE=http://localhost:5000
VITE_CONTACT_ENDPOINT=/api/contact
```

## Step 2: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 3: Start the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```
 Frontend will run on `http://localhost:5173`

## Step 4: Test Locally

1. Open browser and go to `http://localhost:5173`
2. Explore the website
3. Go to Admin Login (`/admin`)
4. Login with:
   - Username: `admin`
   - Password: `admin123`
5. Try booking an appointment
6. View appointments in admin dashboard

---

##  Deploy to Render.com

**Full instructions in [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Summary:
1. Setup MongoDB Atlas (free tier)
2. Deploy Backend as Web Service
3. Deploy Frontend as Static Site
4. Configure environment variables in Render dashboard
5. Update CORS settings on backend

### Important:
-  **DO NOT** commit `.env` files to GitHub
-  Use strong passwords and JWT secrets in production
-  Update Render URLs in README once deployed

---

##  Project Structure

```
cure24/
├── frontend/          # React app - builds to dist/
├── backend/           # Express API
├── DEPLOYMENT.md      # Detailed Render deployment guide
├── SETUP.md          # This file
└── README.md         # Project documentation
```

---

##  Troubleshooting

### "Cannot find module 'express'"
→ Run `npm install` in the backend folder

### Frontend can't reach backend
→ Check `.env.local` has correct `VITE_API_BASE`
→ Make sure backend is running on port 5000

### MongoDB connection failed
→ Either setup local MongoDB or use MongoDB Atlas
→ Check `MONGO_URI` is correct

### Admin login not working
→ Make sure you are using `admin` / `admin123`
→ Check MongoDB is connected

---

Ready to deploy? Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide! 
