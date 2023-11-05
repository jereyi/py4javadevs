const  { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: process.env.POSTGRESQL_POST,
  host: process.env.POSTGRESQL_HOST,
})

module.exports = { pool };