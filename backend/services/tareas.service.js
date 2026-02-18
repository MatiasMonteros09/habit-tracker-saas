const db = require("../database");

const obtenerTareas = async () => {
  const result = await db.query("SELECT * FROM tareas");
  return result.rows;
};

const obtenerTareaPorId = async (id) => {
  const result = await db.query("SELECT * FROM tareas WHERE id = $1", [id]);
  return result.rows[0];
};

const crearTarea = async (data) => {
  const { titulo } = data;

  if (!titulo) {
    throw new Error("El titulo es obligatorio");
  }

  const result = await db.query(
    "INSERT INTO tareas (titulo) VALUES ($1) RETURNING *",
    [titulo]
  );

  return result.rows[0];
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
};
