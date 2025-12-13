const { Pool } = require('pg');
require('dotenv').config();

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

module.exports = { pgPool, connectPg };
