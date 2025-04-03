const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require('./itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://todofe2.vercel.app',    // Your Vercel frontend
    'http://localhost:3000',         // Local development
    'http://localhost:5173'          // Vite's default port
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json()); 

// Connect to MongoDB
mongoose.connect("mongodb+srv://akhilesh:akhilesh@todo.7wimxir.mongodb.net/?retryWrites=true&w=majority&appName=ToDo")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Database connection error:", err));

// Routes
app.use('/api/items', itemRoutes);

// Error handling middleware (add this before app.listen)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});