const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require('./itemRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect("mongodb+srv://akhilesh:akhilesh@todo.7wimxir.mongodb.net/?retryWrites=true&w=majority&appName=ToDo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Database connection error:", err));

// Routes
app.use('/api/items', itemRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});