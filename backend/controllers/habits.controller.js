const habitsService = require("../services/habits.service");

const getHabits = async (req, res) => {
  try {
    const habits = await habitsService.obtenerHabits();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHabit = async (req, res) => {
  try {
    const habit = await habitsService.crearHabit(req.body);
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getHabits,
  createHabit,
};
