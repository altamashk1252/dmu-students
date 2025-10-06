const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const lectureRoutes = require('./routes/lectures');
const eventRoutes = require('./routes/events');
const attendanceRoutes = require('./routes/attendanceRoutes');



const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/attendance', attendanceRoutes);

// Test route
app.get('/', (req, res) => res.send('College backend is running'));

// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
