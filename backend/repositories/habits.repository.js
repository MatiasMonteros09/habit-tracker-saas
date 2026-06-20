const db = require("../database");

const obtenerHabits = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM habits
      WHERE user_id = ?
    `;

    db.all(sql, [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const crearHabit = (data, userId) => {
  const { nombre, descripcion, frecuencia } = data;

  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO habits (
        nombre,
        descripcion,
        frecuencia,
        user_id
      )
      VALUES (?, ?, ?, ?)
    `;

    db.run(
      sql,
      [nombre, descripcion, frecuencia, userId],
      function (err) {
        if (err) reject(err);
        else {
          resolve({
            id: this.lastID,
            nombre,
            descripcion,
            frecuencia,
            user_id: userId
          });
        }
      }
    );
  });
};

const obtenerHabitPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM habits WHERE id = ?",
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

const actualizarHabit = (id, data) => {
  const { nombre, descripcion, frecuencia } = data;

  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE habits
      SET
        nombre = ?,
        descripcion = ?,
        frecuencia = ?
      WHERE id = ?
    `;

    db.run(
      sql,
      [nombre, descripcion, frecuencia, id],
      function (err) {
        if (err) reject(err);
        else resolve(true);
      }
    );
  });
};

const eliminarHabit = (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM habits WHERE id = ?",
      [id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      }
    );
  });
};

module.exports = {
  obtenerHabits,
  crearHabit,
  obtenerHabitPorId,
  actualizarHabit,
  eliminarHabit,
};
