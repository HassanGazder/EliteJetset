# Elite JetsetBolt

A full-stack travel agency management system with admin and agent portals.

## Features

- User authentication (Admin & Agents)
- Contact form management
- Email notifications
- Admin dashboard
- Agent management

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Deployment: Vercel (Frontend), Render (Backend)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Clone the repository
2. Navigate to backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   FRONTEND_URL=https://your-vercel-app.vercel.app
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_app_password
   EMAIL_FROM=your_email
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```
   VITE_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following environment variables:
   - All variables from backend/.env
   - Update FRONTEND_URL to your Vercel deployment URL
4. Set build command: `npm install`
5. Set start command: `node server.js`

### Frontend (Vercel)

1. Import your GitHub repository to Vercel
2. Set the following environment variable:
   - VITE_API_URL: Your Render backend URL
3. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 