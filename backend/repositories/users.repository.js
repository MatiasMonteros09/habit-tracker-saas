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

module.exports = {
  crearUsuario,
};
