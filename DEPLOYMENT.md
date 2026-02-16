# Deployment Guide - Render.com

This guide will help you deploy both the backend and frontend of Cure24 to Render.com.

## Prerequisites

- [Render.com](https://render.com) account (free or paid)
- GitHub account with your project repository
- MongoDB Atlas account for database (free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (use free tier)
4. Create a database user (note username and password)
5. Get your connection string:
   - Click "Connect" → "Drivers" → Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `cure24`
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cure24?retryWrites=true&w=majority`

## Step 2: Deploy Backend to Render

### 2.1 Create a new Web Service

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
   - Select the repository containing your project
   - Authorize Render to access your GitHub

### 2.2 Configure the Backend Service

1. **Name**: `cure24-backend`
2. **Environment**: `Node`
3. **Build Command**: `cd backend && npm install`
4. **Start Command**: `cd backend && npm start`
5. **Plan**: Select "Free" (or any plan)

### 2.3 Add Environment Variables

Click on "Advanced" and add the following environment variables:

```
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cure24?retryWrites=true&w=majority
JWT_SECRET=your_secure_random_string_here_min_32_chars_abcd1234efgh5678ijkl9012mnop
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
CORS_ORIGIN=https://cure24-frontend.onrender.com
NODE_ENV=production
```

**Important**: 
- Replace `MONGO_URI` with your actual MongoDB connection string
- Use a strong, random string for `JWT_SECRET` (at least 32 characters)
- Set `CORS_ORIGIN` to your frontend URL (you'll get this after deploying frontend)

### 2.4 Deploy

Click **"Create Web Service"** and wait for deployment to complete. You'll get a URL like: `https://cure24-backend.onrender.com`

**Note this URL** - you'll need it for the frontend configuration.

## Step 3: Deploy Frontend to Render

### 3.1 Create a Static Site Service

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository (same as backend)

### 3.2 Configure the Frontend Service

1. **Name**: `cure24-frontend`
2. **Build Command**: `cd frontend && npm install && npm run build`
3. **Publish Directory**: `frontend/dist`
4. **Plan**: Select "Free" (or any plan)

### 3.3 Add Environment Variables

Click on "Advanced" and add:

```
VITE_API_BASE=https://cure24-backend.onrender.com
VITE_CONTACT_ENDPOINT=/api/contact
```

**Replace** `https://cure24-backend.onrender.com` with the actual URL you got from step 2.4

### 3.4 Deploy

Click **"Create Static Site"** and wait for deployment to complete. You'll get a URL like: `https://cure24-frontend.onrender.com`

## Step 4: Update Backend CORS Settings

Go back to your backend service on Render:

1. Click on the backend service
2. Click "Environment"
3. Update `CORS_ORIGIN` to match your frontend URL:
   ```
   CORS_ORIGIN=https://cure24-frontend.onrender.com
   ```
4. Click "Save" - the service will redeploy automatically

## Step 5: Verify Deployment

### Test Backend

Open your browser and navigate to:
```
https://cure24-backend.onrender.com
```

You should see:
```json
{"message":"Cure24 Hospital API is running","status":"OK"}
```

### Test Frontend

Open your browser and navigate to:
```
https://cure24-frontend.onrender.com
```

The hospital website should load and work properly.

### Test API Integration

1. Go to the Admin Login page
2. Try logging in with:
   - Username: `admin`
   - Password: (the password you set in `ADMIN_PASSWORD`)
3. Try booking an appointment
4. Check the admin dashboard for saved appointments

## Troubleshooting

### Backend shows "Failed to connect to MongoDB"

- Check that `MONGO_URI` is correct
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0` (allows all IPs)
- Test the connection string locally before deploying

### Frontend can't reach backend API

- Verify `VITE_API_BASE` environment variable in frontend
- Check that backend `CORS_ORIGIN` includes the frontend URL
- Open browser DevTools → Network tab to see API requests

### Free tier services shut down after 15 minutes of inactivity

- Consider upgrading to a paid plan if needed
- Render will wake up the service on first request

### Build fails on Render

- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Make sure `node_modules` is in `.gitignore`

## Production Tips

1. **Keep secrets safe**: Never commit `.env` files to GitHub
2. **Strong passwords**: Use complex passwords for admin account
3. **Monitor logs**: Check Render logs regularly for errors
4. **Backup database**: Use MongoDB Atlas backup features
5. **Custom domain**: Add your own domain in Render settings

## Updating Code

After making changes to your code:

1. Commit and push to GitHub
2. Render will automatically redeploy both services
3. Wait for deployment to complete (you can watch the logs)

## Need Help?

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Or check the GitHub issues in your repository
