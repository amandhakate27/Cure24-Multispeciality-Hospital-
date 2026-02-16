# Cure24 - Hospital Management System

A modern, full-stack hospital management system with appointment booking, doctor listings, insurance information, and an admin dashboard.

## Live Demo

- **Frontend**: [Cure24 Hospital](https://your-frontend-url.onrender.com)
- **Backend API**: [API Server](https://your-backend-url.onrender.com)

> Update the links above with your actual Render deployment URLs once deployed. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Features

- **Home Page** - Hero section with call-to-action and key services
- **Doctors Directory** - Browse and view doctor profiles
- **Appointments** - Book appointments with doctors
- **Services** - Comprehensive list of hospital services
- **Insurance** - Insurance provider information and details
- **About Us** - Hospital information and history
- **Contact** - Get in touch with the hospital
- **Admin Dashboard** - Manage appointments, doctors, and hospital data
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Cors** - Cross-Origin Resource Sharing
- **Helmet** - Security middleware
- **Mongoose** - MongoDB ODM

## Project Structure

```
cure24/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   └── assets/        # Images and static files
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
├── backend/           # Node.js backend API
│   ├── server.js      # Main server file
│   └── package.json   # Backend dependencies
└── README.md          # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend API will start on `http://localhost:3000` (or configured port)

## Environment Variables

### Backend (.env)
Copy `.env.example` to `.env` and fill in your values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cure24
JWT_SECRET=your_super_secret_jwt_key_change_this
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env.local)
Copy `.env.example` to `.env.local` and fill in your values:
```
VITE_API_BASE=http://localhost:5000
VITE_CONTACT_ENDPOINT=/api/contact
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start server
- `npm run dev` - Start with nodemon (auto-reload on changes)

## Usage

1. Create `.env` file in backend folder (copy from `.env.example`)
2. Create `.env.local` file in frontend folder (copy from `.env.example`)
3. Start the backend server: `cd backend && npm run dev`
4. Start the frontend development server: `cd frontend && npm run dev`
5. Access the application at `http://localhost:5173`
6. Navigate through the different pages and features
7. Use the admin dashboard to manage content (default: username: `admin`, password: `admin123`)

## Deployment

For detailed instructions on deploying to Render.com, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deployment Summary
- Backend: Deploy as Web Service on Render
- Frontend: Deploy as Static Site on Render
- Database: Use MongoDB Atlas (free tier available)
- Environment Variables: Configure in Render dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

##
Developed By [@amandhakate27](https://github.com/amandhakate27)

---

**Last Updated:** February 2026
