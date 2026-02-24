const habitLogsService = require("../services/habitLogs.service");

const toggleToday = async (req, res) => {
  try {
    const result = await habitLogsService.toggleToday(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStreak = async (req, res) => {
  try {
    const streak = await habitLogsService.calcularStreak(req.params.id);
    res.json({ streak });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLogsCalendario = async (req, res) => {
  try {
    const logs = await habitLogsService.obtenerLogsCalendario(req.params.id);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await habitLogsService.obtenerStatsHabit(req.params.id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  toggleToday,
  getStreak,
  getLogsCalendario,
  getStats,
};
