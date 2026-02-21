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
  const { titulo, descripcion, fecha } = data;

  // ✅ Validación (esto es lógica de negocio → service)
  if (!titulo) {
    throw new Error("El título es obligatorio");
  }

  return await tareasRepository.crearTarea({ titulo, descripcion, fecha });
};

const completarTarea = async (id) => {
  // 1️⃣ Verificar que exista
  const tarea = await tareasRepository.obtenerTareaPorId(id);

  if (!tarea) {
    throw new Error("Tarea no encontrada");
  }

  // 2️⃣ Evitar completar dos veces (lógica de negocio real)
  if (tarea.completada === 1) {
    throw new Error("La tarea ya está completada");
  }

  // 3️⃣ Completar
  return await tareasRepository.completarTarea(id);
};

const toggleTarea = async (id) => {
  // 1️⃣ Verificar que exista
  const tarea = await tareasRepository.obtenerTareaPorId(id);

  if (!tarea) {
    throw new Error("Tarea no encontrada");
  }

  // 2️⃣ Invertir estado
  const nuevoEstado = tarea.completada === 1 ? 0 : 1;

  // 3️⃣ Persistir
  return tareasRepository.toggleTarea(id, nuevoEstado);
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  completarTarea,
  toggleTarea,
};
