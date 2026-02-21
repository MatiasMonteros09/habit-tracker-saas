const habitsRepository = require("../repositories/habits.repository");

const obtenerHabits = async () => {
  return habitsRepository.obtenerHabits();
};

const crearHabit = async (data) => {
  if (!data.nombre) {
    throw new Error("El nombre es obligatorio");
  }

  return habitsRepository.crearHabit(data);
};

module.exports = {
  obtenerHabits,
  crearHabit,
};
