## Cure24 Hospital Project

Simple hospital website + admin appointment management. Frontend React (Vite) aur backend Express API.

## Live Link (Render)
https://cure24hospital.onrender.com/

## Tech Stack (Versions)

### Frontend (cure24/frontend)
- React: 19.2.0
- React DOM: 19.2.0
- React Router DOM: 7.13.0
- Tailwind CSS: 4.1.18 (via @tailwindcss/vite 4.1.18)
- Framer Motion: 12.34.0
- Lucide React: 0.542.0
- Vite: 7.2.4
- ESLint: 9.39.1

### Backend (cure24/backend)
- Node + Express API
- Express: 4.18.2
- Mongoose: 8.0.3
- JWT: 9.0.2
- BcryptJS: 2.4.3
- CORS: 2.8.5
- Dotenv: 16.3.1
- Helmet: 7.1.0
- Express Rate Limit: 7.0.0
- Nodemon: 3.0.1 (dev)

## Project Structure
```
cure24/
	frontend/   # React app
	backend/    # Express API
	SETUP.md    # Full setup steps
	DEPLOYMENT.md
```

## Local Setup (Short)
1) Backend
```
cd backend
npm install
npm run dev
```

2) Frontend
```
cd frontend
npm install
npm run dev
```

Full setup aur env files ka detail: SETUP.md

## Environment Variables (Required)
Backend (.env):
- PORT
- MONGO_URI
- JWT_SECRET
- ADMIN_USERNAME
- ADMIN_PASSWORD
- CORS_ORIGIN
- NODE_ENV

Frontend (.env.local):
- VITE_API_BASE
- VITE_CONTACT_ENDPOINT

## Scripts
Frontend:
- npm run dev
- npm run build
- npm run preview
- npm run lint

Backend:
- npm run dev
- npm start


## @amandhakate27

