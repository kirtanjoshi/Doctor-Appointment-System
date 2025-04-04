const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoutes = require('./src/routes/authroutes');
const protectedRoutes = require('./src/routes/protectedRoutes');

const app = express();
const port = process.env.PORT;
const db = process.env.MONGO_URI

console.log(db)
app.use(express.json());




app.get("/", (req, res) => {
    res.send("Hello World");
})


app.use("/api/auth" , authRoutes );
app.use('/api/protected', protectedRoutes);


const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

connectDB();


app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));

