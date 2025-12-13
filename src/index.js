const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectPg } = require('./config/database');
const { connectFirebase } = require('./config/firebase');
const pgRoutes = require('./routes/pgRoutes');
const firebaseRoutes = require('./routes/firebaseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connections
connectPg();
connectFirebase();

// Routes
app.use('/api/pg', pgRoutes);
app.use('/api/firebase', firebaseRoutes);

app.get('/', (req, res) => {
    res.send('Bixso Middleware API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
