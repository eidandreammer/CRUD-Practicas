const express = require("express");
const server = express();
const { Pool } = require("pg");
const port = 3000;

server.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "0000",
  database: "crud",
  port: 5432,
});

server.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
