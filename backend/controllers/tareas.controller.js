const tareasService = require("../services/tareas.service");

const obtenerTareas = async (req, res) => {
  try {
    const tareas = await tareasService.obtenerTareas();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await tareasService.obtenerTareaPorId(req.params.id);
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearTarea = async (req, res) => {
  try {
    const tarea = await tareasService.crearTarea(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
};
