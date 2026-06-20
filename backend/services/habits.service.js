const habitsRepository = require("../repositories/habits.repository");

const obtenerHabits = async (userId) => {
  return habitsRepository.obtenerHabits(userId);
};

const crearHabit = async (data, userId) => {
  if (!data.nombre) {
    throw new Error("El nombre es obligatorio");
  }

  return await habitsRepository.crearHabit(data, userId);
};

const obtenerHabitPorId = async (id) => {
  return habitsRepository.obtenerHabitPorId(id);
};

const actualizarHabit = async (id, data) => {
  if (!data.nombre) {
    throw new Error("El nombre es obligatorio");
  }

  return habitsRepository.actualizarHabit(id, data);
};

const eliminarHabit = async (id) => {
  return habitsRepository.eliminarHabit(id);
};

module.exports = {
  obtenerHabits,
  crearHabit,
  obtenerHabitPorId,
  actualizarHabit,
  eliminarHabit,
};
