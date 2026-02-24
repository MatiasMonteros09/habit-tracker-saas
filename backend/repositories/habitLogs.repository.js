const db = require("../database");

const obtenerLogHoy = (habitId, fecha) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM habit_logs WHERE habit_id = ? AND fecha = ?",
      [habitId, fecha],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      },
    );
  });
};

const crearLog = (habitId, fecha) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO habit_logs (habit_id, fecha, completado) VALUES (?, ?, 0)",
      [habitId, fecha],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      },
    );
  });
};

const toggleLog = (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE habit_logs SET completado = CASE WHEN completado = 1 THEN 0 ELSE 1 END WHERE id = ?",
      [id],
      function (err) {
        if (err) reject(err);
        else resolve(true);
      },
    );
  });
};

const obtenerLogsCompletados = (habitId) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT fecha FROM habit_logs WHERE habit_id = ? AND completado = 1 ORDER BY fecha DESC",
      [habitId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
};

const obtenerLogsPorHabit = (habitId) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT fecha, completado FROM habit_logs WHERE habit_id = ? ORDER BY fecha ASC",
      [habitId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
};

const obtenerStatsBase = (habitId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN completado = 1 THEN 1 ELSE 0 END) as completados
      FROM habit_logs
      WHERE habit_id = ?
      `,
      [habitId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      },
    );
  });
};

module.exports = {
  obtenerLogHoy,
  crearLog,
  toggleLog,
  obtenerLogsCompletados,
  obtenerLogsPorHabit,
  obtenerStatsBase,
};
