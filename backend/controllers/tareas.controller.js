const db = require("../database");

// Obtener todas las tareas
const getTareas = (req, res) => {
  db.all("SELECT * FROM tareas", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener tareas" });
    }
    res.json(rows);
  });
};

// Crear tarea
const createTarea = (req, res) => {
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
    }
  );
};

// Eliminar tarea
const deleteTarea = (req, res) => {
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
};

// Actualizar tarea
const updateTarea = (req, res) => {
  const id = req.params.id;
  const { titulo, fecha } = req.body;

  db.run(
    "UPDATE tareas SET titulo = ?, fecha = ? WHERE id = ?",
    [titulo, fecha, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar tarea" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ mensaje: "Tarea no encontrada" });
      }

      res.json({ mensaje: "Tarea actualizada correctamente" });
    }
  );
};

module.exports = {
  getTareas,
  createTarea,
  deleteTarea,
  updateTarea,
};
