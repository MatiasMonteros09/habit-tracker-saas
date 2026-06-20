const express = require("express");
const router = express.Router();

const habitLogsController = require("../controllers/habitLogs.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/:id/toggle-today",authMiddleware,habitLogsController.toggleToday);

router.get("/:id/streak",authMiddleware,habitLogsController.getStreak);

router.get("/:id/logs",authMiddleware,habitLogsController.getLogsCalendario);

router.get("/:id/stats",authMiddleware,habitLogsController.getStats);

module.exports = router;