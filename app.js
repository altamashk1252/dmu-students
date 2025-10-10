const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const lectureRoutes = require('./routes/lectures');
const eventRoutes = require('./routes/events');
const attendanceRoutes = require('./routes/attendanceRoutes');
const createlectureRoutes = require("./routes/createLectureRoutes");
const attendanceRoutesnew = require("./routes/attendancenew");
const programRoutes = require('./routes/programRoutes');

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
app.use("/api/createLectures", createlectureRoutes);
app.use("/api/attendancenew", attendanceRoutesnew);
app.use('/api/programs', programRoutes);

// Test route
app.get('/', (req, res) => res.send('College backend is running'));

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  console.log('Database tables synchronized successfully');
  app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
    console.log(`Server running on http://<your-local-ip>:${process.env.PORT || 5000}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});

