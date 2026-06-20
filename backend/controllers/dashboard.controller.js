const dashboardService = require("../services/dashboard.service");

const getDashboard = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;

    const dashboard =
      await dashboardService.obtenerDashboard(
        userId
      );

    res.json(dashboard);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};
