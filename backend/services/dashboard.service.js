const dashboardRepository = require("../repositories/dashboard.repository");

const obtenerDashboard = async (userId) => {
  
  const hoy = new Date().toISOString().split("T")[0];

  const totalHabits = await dashboardRepository.obtenerTotalHabits(userId);

  const completedToday = await dashboardRepository.obtenerCompletadosHoy(
    userId,
    hoy,
  );

  const completionRate =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return {
    totalHabits,
    completedToday,
    completionRate,
  };
};

module.exports = {
  obtenerDashboard,
};
