// Initialize express app
const express = require('express');
const app = express();

const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const certificateRoutes = require('./routes/certificates');
const verificationRoutes = require('./routes/verification');
const path = require('path');

// Load environment variables
dotenv.config();


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({  
  origin: 'https://certifynow.netlify.app', // your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory for certificate storage if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/certificates', certificateRoutes);
app.use('/api/verify', verificationRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Certificate Generation and Verification API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});