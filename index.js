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

server.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.status(200).json({
      data: result.rows,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
    });
  }
});

server.get("/usuarios/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query("SELECT * FROMM usuarios WHERE id = $1", [
      1,
    ]);
    const usuario = result.rows[0];

    if (!usuario) {
      res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Usuario encontrado",
    });
  } catch (error) {
    console.error("Error al obtener usuario");
    res.status(500).json({
      message: "Error interno del servidor",
      success: false,
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
