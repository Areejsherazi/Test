require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./res/Database/connection');
const userRoutes = require('./res/routers/userRoutes');
const authMiddleware=require('./res/routers/authRoutes');
const postRoutes = require("./res/routers/postRoutes");
const petRoute=require("./res/routers/petRoute");
const path = require("path");
const app = express();
const likeRoutes=require('./res/routers/likeRoutes');
const decodeMiddleware=require('./res/middleware/decodeMiddleware');
const commentRoutes=require('./res/routers/commentRoutes');
const notificationRoutes=require('./res/routers/notificationRoutes');
const getPetRoutes=require('./res/routers/getPetRoutes');
const getDoctorsRoute=require('./res/routers/getDoctorsRoute')
const appointmentRoutes=require('./res/routers/appointmentRoutes');

app.use(express.json());


// Define Routes 
app.use('/auth',authMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/posts", postRoutes);
app.use("/api",likeRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use('/api',commentRoutes);
app.use('/api',notificationRoutes);
app.use('/',petRoute);
app.use('/',getPetRoutes);
app.use('/get',getDoctorsRoute);
app.use('/appointments',appointmentRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

