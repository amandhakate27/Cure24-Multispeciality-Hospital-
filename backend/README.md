# Cure24 Hospital Backend API

Backend API for Cure24 Hospital Management System

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env` file and update values if needed
   - Default admin credentials: `admin / cure24@admin`

3. Start the server:

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Public Endpoints

- `GET /` - Health check
- `POST /api/appointments` - Create new appointment

### Admin Endpoints

- `POST /api/admin/login` - Admin login
- `GET /api/appointments` - Get all appointments (admin only)
- `DELETE /api/appointments/:id` - Delete appointment (admin only)
- `PATCH /api/appointments/:id` - Update appointment status (admin only)

## Admin Credentials

**Username:** admin  
**Password:** cure24@admin

## Technology Stack

- Node.js
- Express.js
- CORS
- Body-parser
- Dotenv

## Notes

- Currently uses in-memory storage
- For production, integrate with a database (MongoDB, PostgreSQL, etc.)
- Implement JWT authentication for secure admin access
- Add input validation and sanitization
- Implement rate limiting for API endpoints
