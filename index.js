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
    const usuarios = await pool.query("SELECT * FROM usuarios ORDER BY id ASC");

    if (!usuarios.rows.length) {
      res.status(404).json({
        message: "Usuarios no encontrados",
        success: false,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: usuarios.rows,
    });
  } catch (error) {
    console.error("Error del servidor");
    res.status(500).json({
      message: "Error del lado del servidor",
      success: false,
    });
  }
});

server.get("/usuarios/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const resultado = await pool.query("SELECT * FROM usuarios WHERE id=$1", [
      id,
    ]);
    const usuario = resultado.rows[0];
    if (!usuario) {
      res.status(404).json({
        message: "Usuario no encontrado",
        success: false,
      });
      return;
    }

    res.status(200).json({
      data: usuario,
      success: true,
    });
  } catch (error) {
    console.error("Error del lado del servidor");
    res.status(500).json({
      message: "Error del lado del servidor",
      success: false,
    });
  }
});

server.post("/usuarios", async (req, res) => {
  const { name, age } = req.body;

  if (name === undefined || age === undefined) {
    res.status(400).json({
      success: false,
      message: "Falta informacion",
    });
    return;
  }

  try {
    const query =
      "INSERT INTO usuarios (name, age) VALUES ($1, $2) RETURNING *;";
    const values = [name, age || null];

    const result = await pool.query(query, values);
    const nuevoUsuario = result.rows[0];

    res.status(201).json({
      data: nuevoUsuario,
      success: true,
    });
  } catch (error) {
    console.error("Error al crear usuario", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el usuario",
    });
  }
});



server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
