// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();
// const authRoutes = require('./src/routes/authroutes');
// const protectedRoutes = require('./src/routes/protectedRoutes');
// const cors = require('cors'); // Import cors
// const app = express();
// const port = process.env.PORT;
// const db = process.env.MONGO_URI

// console.log(db)
// app.use(express.json());



// app.get("/", (req, res) => {
//     res.send("Hello World");
// })
// // Enable CORS
// app.use(cors({
//     origin: 'http://127.0.0.1:5500/backend/index2.html', // Allow requests from this origin (your frontend)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'] ,// Allowed headers
//     credentials: true,
// }));
  
// app.use("/api/auth" , authRoutes );
// app.use('/api/protected', protectedRoutes);




// const connectDB = async () => {
//     try {
//         await mongoose.connect(db);

//         console.log("✅ MongoDB Connected Successfully");
//     } catch (error) {
//         console.error("❌ MongoDB Connection Error:", error.message);
//         process.exit(1);
//     }
// };

// connectDB();


// app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const authRoutes = require('./src/routes/authroutes');
const protectedRoutes = require('./src/routes/protectedRoutes');
const doctorRoutes = require('./src/routes/doctor-routes');
const bookAppointmentRoutes = require('./src/routes/appoinment-booking');

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Enable CORS for local frontend development
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500','http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/',doctorRoutes)
app.use('/api/appointments',bookAppointmentRoutes)

// Connect to MongoDB and start server
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected Successfully');
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();
