const db = require("../database");

const obtenerTareas = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tareas", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
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

const crearTarea = ({ titulo, descripcion, fecha }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO tareas (titulo, descripcion, fecha) VALUES (?, ?, ?)",
      [titulo, descripcion, fecha],
      function (err) {
        if (err) reject(err);
        else
          resolve({
            id: this.lastID,
            titulo,
            descripcion,
            fecha,
            completada: 0,
          });
      },
    );
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

