const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectMongo, connectPg } = require('./config/database');
const mongoRoutes = require('./routes/mongoRoutes');
const pgRoutes = require('./routes/pgRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connections
connectMongo();
connectPg();

// Routes
app.use('/api/mongo', mongoRoutes);
app.use('/api/pg', pgRoutes);

app.get('/', (req, res) => {
    res.send('Bixso Middleware API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
