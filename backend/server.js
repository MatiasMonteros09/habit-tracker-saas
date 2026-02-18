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

// Eliminar tarea por ID
app.delete("/tareas/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM tareas WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar tarea" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json({ mensaje: "Tarea eliminada correctamente" });
  });
});


// Puerto
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
