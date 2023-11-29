const  { Pool } = require('pg');

const pool = process.env.NODE_ENV === "test" ? new Pool({
  database: 'postgres',
  port: 5432,
  max: 10, // Pool max size
  idleTimeoutMillis: 1000 // Close idle clients after 1 second
}) : new Pool({
  user: process.env.POSTGRESQL_USER,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: process.env.POSTGRESQL_POST,
  host: process.env.POSTGRESQL_HOST,
})

module.exports = { pool };