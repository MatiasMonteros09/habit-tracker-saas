const db = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const tareas = [];
// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});
app.get("/saludo", (req, res) => {
  res.json({
    mensaje: "Hola Mati, tu backend está funcionando correctamente",
  });
});
app.post("/tareas", (req, res) => {
  const nuevaTarea = req.body;

  app.get("/tareas", (req, res) => {
    res.json(tareas);
  });

  tareas.push(nuevaTarea);

  res.json({
    mensaje: "Tarea guardada",
    tareas: tareas,
  });
});

// Puerto
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
