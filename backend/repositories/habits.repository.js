const db = require("../database");

const obtenerHabits = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM habits", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const crearHabit = (data) => {
  const { nombre, descripcion, frecuencia } = data;

  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO habits (nombre, descripcion, frecuencia)
      VALUES (?, ?, ?)
    `;

    db.run(sql, [nombre, descripcion, frecuencia], function (err) {
      if (err) reject(err);
      else {
        resolve({
          id: this.lastID,
          nombre,
          descripcion,
          frecuencia,
        });
      }
    });
  });
};

module.exports = {
  obtenerHabits,
  crearHabit,
};
