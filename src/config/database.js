const mongoose = require('mongoose');
const { Pool } = require('pg');
require('dotenv').config();

// MongoDB Connection
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // process.exit(1); // Optional: Exit process on failure
  }
};

// PostgreSQL Connection
const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const connectPg = async () => {
  try {
    const client = await pgPool.connect();
    console.log('PostgreSQL Connected Successfully');
    client.release();
  } catch (err) {
    console.error('PostgreSQL Connection Error:', err.message);
  }
};

module.exports = { connectMongo, pgPool, connectPg };
