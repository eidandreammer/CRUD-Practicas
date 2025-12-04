const express = require("express");
const server = express();
const port = 3000;

server.use(express.json());

server.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("select * from usuarios order by id asc");
    return res.status(200).json({
      data: result.rows,
      success: true,
    });
  } catch (error) {
    console.error("Error en GET /posts:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
