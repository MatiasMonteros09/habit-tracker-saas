const habitLogsService = require("../services/habitLogs.service");
const habitsService = require("../services/habits.service");

const validarPropietarioHabit = async (habitId, userId) => {
  const habit = await habitsService.obtenerHabitPorId(habitId);

  if (!habit) {
    throw new Error("Hábito no encontrado");
  }

  if (habit.user_id !== userId) {
    throw new Error("No tienes permisos para acceder a este hábito");
  }

  return habit;
};

const toggleToday = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user.userId;

    await validarPropietarioHabit(habitId, userId);

    const result = await habitLogsService.toggleToday(habitId);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getStreak = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user.userId;

    await validarPropietarioHabit(habitId, userId);

    const streak = await habitLogsService.calcularStreak(habitId);

    res.json({ streak });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getLogsCalendario = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user.userId;

    await validarPropietarioHabit(habitId, userId);

    const logs = await habitLogsService.obtenerLogsCalendario(habitId);

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getStats = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user.userId;

    await validarPropietarioHabit(habitId, userId);

    const stats = await habitLogsService.obtenerStatsHabit(habitId);

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  toggleToday,
  getStreak,
  getLogsCalendario,
  getStats,
};
