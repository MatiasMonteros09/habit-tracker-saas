const db = require("../database");

const obtenerTotalHabits = (userId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT COUNT(*) as total
      FROM habits
      WHERE user_id = ?
      `,
      [userId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row.total);
      },
    );
  });
};

const obtenerCompletadosHoy = (userId, fecha) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT COUNT(*) as total
      FROM habit_logs hl
      INNER JOIN habits h
        ON hl.habit_id = h.id
      WHERE h.user_id = ?
        AND hl.fecha = ?
        AND hl.completado = 1
      `,
      [userId, fecha],
      (err, row) => {
        if (err) reject(err);
        else resolve(row.total);
      },
    );
  });
};

module.exports = {
  obtenerTotalHabits,
  obtenerCompletadosHoy,
};
