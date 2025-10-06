# DMU College Management System

A Node.js backend API for college management system with authentication, student management, lectures, events, announcements, and attendance tracking.

## Features

- **Authentication**: User registration and login with JWT
- **Student Management**: Get student information
- **Lecture Management**: Schedule and retrieve lectures
- **Event Management**: Create and manage college events
- **Announcement System**: Create and view announcements
- **News Management**: Create and view news
- **Attendance Tracking**: Track student attendance

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login

### Students (`/api/students`)
- `GET /` - Get all students (protected)

### Lectures (`/api/lectures`)
- `GET /` - Get all lectures (protected)
- `POST /` - Schedule new lecture (protected)

### Events (`/api/events`)
- `GET /` - Get all events (protected)
- `POST /` - Create new event (protected)

### Announcements (`/api/announcements`)
- `GET /` - Get all announcements
- `POST /` - Create announcement (protected, admin/lecturer only)

### News (`/api/news`)
- `GET /` - Get all news
- `POST /` - Create news (protected)

### Attendance (`/api/attendance`)
- `GET /summary/:studentId` - Get attendance summary
- `GET /details/:studentId/:subjectId` - Get detailed attendance
- `POST /add` - Add attendance record

## Environment Variables

Copy `env.example` to `.env` and configure:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

## Local Development

```bash
npm install
npm run dev
```

## Deployment on Render

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Create a PostgreSQL database on Render
4. Set environment variables in Render dashboard
5. Deploy!

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt for password hashing
