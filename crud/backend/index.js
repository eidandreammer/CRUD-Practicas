//Importar librerias
const express = require("express");
const cors = require("cors");
const { pool } = require("pg");

//Crear la app de express
const app = express();

//Configuracion basica
const port = 4000;

//Middlewares
app.use(cors()); //Permite que react pueda llamar a este servidor
app.use(express.json()); //Permite leer JSON en req.body

//Configurar conexion a PostgreSQL
const pool = new pool({
  user: "postgres",
  host: "localhost",
  database: "crud",
  password: "000",
  port: 5432,
});

//Ruta de read (Obtener todos los items)
//Get /api/items
app.get("/api/items", async (req, res) => {
  try {
    const result = await pool.query(
      "select * from usuarios order by idusuarios asc"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios: ", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});


