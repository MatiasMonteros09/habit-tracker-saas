const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta donde se va a crear el archivo database.db
const dbPath = path.resolve(__dirname, "database.db");

// Crear o conectar a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos", err);
  } else {
    console.log("Conectado a SQLite");

    // Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha TEXT,
    completada INTEGER DEFAULT 0)`
    );
  }
});

module.exports = db;
