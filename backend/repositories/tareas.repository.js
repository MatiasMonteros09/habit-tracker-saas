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

const crearTarea = (titulo, descripcion) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)";

    db.run(sql, [titulo, descripcion], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          titulo,
          descripcion,
        });
      }
    });
  });
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
};
