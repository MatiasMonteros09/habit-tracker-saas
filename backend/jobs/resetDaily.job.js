const cron = require("node-cron");

// Todos los días a las 00:00
cron.schedule("0 0 * * *", async () => {
  console.log("Running reset daily job");

  try {
    // Por ahora solo log (después agregamos lógica real)
  } catch (error) {
    console.log("Reset daily job error:", error.message);
  }
});
