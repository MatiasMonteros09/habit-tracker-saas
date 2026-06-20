const { obtenerHabits } = require("../repositories/habits.repository");
const habitsService = require("../services/habits.service");

const getHabits = async (req, res) => {
  try {
    const userId = req.user.userId;

    const habits = await habitsService.obtenerHabits(userId);

    res.json(habits);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createHabit = async (req, res) => {
  try {
    const userId = req.user.userId;

    const habit = await habitsService.crearHabit(req.body, userId);

    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const obtenerHabitPorId = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user.userId;

    const habit = await habitsService.obtenerHabitPorId(habitId);

    if (!habit) {
      return res.status(404).json({
        error: "Hábito no encontrado"
      });
    }

    if (habit.user_id !== userId) {
      return res.status(403).json({
        error: "No tienes permisos para acceder a este hábito"
      });
    }

    res.json(habit);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const actualizarHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user.userId;

    const habit = await habitsService.obtenerHabitPorId(habitId);

    if (!habit) {
      return res.status(404).json({
        error: "Hábito no encontrado"
      });
    }

    if (habit.user_id !== userId) {
      return res.status(403).json({
        error: "No tienes permisos para modificar este hábito"
      });
    }

    await habitsService.actualizarHabit(
      habitId,
      req.body
    );

    const habitActualizado =
      await habitsService.obtenerHabitPorId(habitId);

    res.json(habitActualizado);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const eliminarHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user.userId;

    const habit = await habitsService.obtenerHabitPorId(habitId);

    if (!habit) {
      return res.status(404).json({
        error: "Hábito no encontrado"
      });
    }

    if (habit.user_id !== userId) {
      return res.status(403).json({
        error: "No tienes permisos para eliminar este hábito"
      });
    }

    await habitsService.eliminarHabit(habitId);

    res.json({
      mensaje: "Hábito eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  getHabits,
  createHabit,
  obtenerHabitPorId,
  actualizarHabit,
  eliminarHabit,
};
