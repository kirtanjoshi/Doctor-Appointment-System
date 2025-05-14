const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // ✅ new
const { Server } = require("socket.io");

dotenv.config();

const authRoutes = require('./src/routes/authroutes');
const protectedRoutes = require('./src/routes/protectedRoutes');
const doctorRoutes = require('./src/routes/doctor-routes');
const patientRoutes = require('./src/routes/patient-routes');
const bookAppointmentRoutes = require('./src/routes/appoinment-booking');

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;



// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Setup socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: ['http://127.0.0.1:5500', 'http://localhost:5173', 'http://localhost:5175'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

app.use((req, res, next) => {
  console.log("🧾 Incoming Body:", req.body);
  next();
});


// ✅ Track connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('register', (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`👤 Registered user ${userId} to socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
    for (const [userId, sockId] of connectedUsers.entries()) {
      if (sockId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

// ✅ Make socket objects available in routes
app.set("io", io);
app.set("connectedUsers", connectedUsers);

// Middleware
app.use(express.json());

// CORS
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5173', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));



// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/', doctorRoutes);
app.use('/api/', patientRoutes);
app.use('/api/appointments', bookAppointmentRoutes);

// Connect to MongoDB and start server
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected Successfully');

    // ✅ Start server with socket support
    server.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();
