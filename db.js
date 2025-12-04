const { pool } = require("pg");

const pool = new pool({
  user: "postgres",
  host: "localhost",
  database: "crud",
  password: "0000",
  port: 5432,
});

module.exports = pool;
