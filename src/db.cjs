const { Pool } = require('pg');

const pool = process.env.NODE_ENV === "test" ? new Pool({
  database: 'postgres',
  port: 5432,
  max: 10, // Pool max size
  idleTimeoutMillis: 1000 // Close idle clients after 1 second
}) : new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = { pool };