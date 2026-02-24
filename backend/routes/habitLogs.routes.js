const express = require("express");
const router = express.Router();
const habitLogsController = require("../controllers/habitLogs.controller");

router.post("/:id/toggle-today", habitLogsController.toggleToday);
router.get("/:id/streak", habitLogsController.getStreak);
router.get("/:id/logs", habitLogsController.getLogsCalendario);
router.get("/:id/stats", habitLogsController.getStats);

module.exports = router;
