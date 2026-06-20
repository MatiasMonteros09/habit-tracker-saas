const db = require("../database");

const obtenerTareas = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tareas WHERE user_id = ?";

    db.all(sql, [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const obtenerTareaPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM tareas WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const crearTarea = (titulo, descripcion, fecha, userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO tareas (titulo, descripcion, fecha, user_id)
      VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [titulo, descripcion, fecha, userId], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, titulo, descripcion, fecha });
    });
  });
};

const completarTarea = (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE tareas SET completada = 1 WHERE id = ?",
      [id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, cambios: this.changes });
      },
    );
  });
};

const toggleTarea = (id, nuevoEstado) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE tareas SET completada = ? WHERE id = ?",
      [nuevoEstado, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, completada: nuevoEstado });
      },
    );
  });
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  completarTarea,
  toggleTarea,
};
