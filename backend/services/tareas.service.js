const tareasRepository = require("../repositories/tareas.repository");

const obtenerTareas = async () => {
  return await tareasRepository.obtenerTareas();
};

const obtenerTareaPorId = async (id) => {
  const tarea = await tareasRepository.obtenerTareaPorId(id);

  if (!tarea) {
    throw new Error("Tarea no encontrada");
  }

  return tarea;
};

const crearTarea = async (data) => {
  const { titulo, fecha } = data;

  // ✅ Validación (esto es lógica de negocio → service)
  if (!titulo) {
    throw new Error("El título es obligatorio");
  }

  return await tareasRepository.crearTarea({ titulo, fecha });
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
};
