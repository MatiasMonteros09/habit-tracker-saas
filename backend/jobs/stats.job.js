const cron = require("node-cron");
const habitLogsService = require("../services/habitLogs.service");

// Todos los días a las 00:10
cron.schedule("10 0 * * *", async () => {
  console.log("Running stats job");

  try {
    await habitLogsService.recalculateStats?.();
  } catch (error) {
    console.log("Stats job error:", error.message);
  }
});
