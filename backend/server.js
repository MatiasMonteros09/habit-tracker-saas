const db = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Obtener todas las tareas
app.get("/tareas", (req, res) => {
  db.all("SELECT * FROM tareas", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener tareas" });
    }

    res.json(rows);
  });
});

// Crear nueva tarea
app.post("/tareas", (req, res) => {
  const { titulo, fecha } = req.body;

  db.run(
    "INSERT INTO tareas (titulo, fecha) VALUES (?, ?)",
    [titulo, fecha],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Error al guardar tarea" });
      }

      res.json({
        mensaje: "Tarea guardada",
        id: this.lastID,
      });
    },
  );
});

// Puerto
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
