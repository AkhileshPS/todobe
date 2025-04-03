const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require('./itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['https://todofe2.vercel.app', 'http://localhost:3000'], // Allow both production and local frontend
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

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});