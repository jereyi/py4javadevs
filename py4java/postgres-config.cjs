const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  post: process.env.POSTGRESQL_POST,
});

module.exports = {
  pool,
};
