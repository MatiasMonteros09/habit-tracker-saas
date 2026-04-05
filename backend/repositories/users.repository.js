const db = require("../database");

const crearUsuario = (nombre, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO users (nombre, email, password)
      VALUES (?, ?, ?) 
    `; //esto ??? evita que inyecten codigo sql, es por seguridad

    db.run(sql, [nombre, email, password], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          nombre,
          email,
        });
      }
    });
  });
};

const obtenerUsuarioPorEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE email = ?`;

    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = {
  crearUsuario,
  obtenerUsuarioPorEmail,
};
