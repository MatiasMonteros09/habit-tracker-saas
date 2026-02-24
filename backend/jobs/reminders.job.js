const cron = require("node-cron");
const habitsService = require("../services/habits.service");

cron.schedule("0 9 * * *", async () => {
  console.log("Running reminders job");

  await habitsService.sendHabitReminders();
});
