const habitLogsRepository = require("../repositories/habitLogs.repository");

const toggleToday = async (habitId) => {
  const fechaHoy = new Date().toISOString().split("T")[0];

  let log = await habitLogsRepository.obtenerLogHoy(habitId, fechaHoy);

  // Si no existe → crear
  if (!log) {
    await habitLogsRepository.crearLog(habitId, fechaHoy);
    log = await habitLogsRepository.obtenerLogHoy(habitId, fechaHoy);
  }

  // Toggle
  await habitLogsRepository.toggleLog(log.id);

  const actualizado = await habitLogsRepository.obtenerLogHoy(
    habitId,
    fechaHoy,
  );

  return actualizado;
};

const calcularStreak = async (habitId) => {
  const logs = await habitLogsRepository.obtenerLogsCompletados(habitId);

  if (!logs.length) return 0;

  let streak = 0;
  let fechaActual = new Date().toISOString().split("T")[0];

  for (const log of logs) {
    if (log.fecha === fechaActual) {
      streak++;
      const d = new Date(fechaActual);
      d.setDate(d.getDate() - 1);
      fechaActual = d.toISOString().split("T")[0];
    } else {
      break;
    }
  }

  return streak;
};

const obtenerLogsCalendario = async (habitId) => {
  const logs = await habitLogsRepository.obtenerLogsPorHabit(habitId);
  return logs;
};

const obtenerStatsHabit = async (habitId) => {
  const base = await habitLogsRepository.obtenerStatsBase(habitId);
  const streak = await calcularStreak(habitId);

  const total = base.total || 0;
  const completados = base.completados || 0;

  const consistencia =
    total === 0 ? 0 : Math.round((completados / total) * 100);

  return {
    total,
    completados,
    consistencia,
    streak,
  };
};

module.exports = {
  toggleToday,
  calcularStreak,
  obtenerLogsCalendario,
  obtenerStatsHabit,
};
