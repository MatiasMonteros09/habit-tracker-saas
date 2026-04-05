const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habits.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", habitsController.getHabits);
router.post("/", habitsController.createHabit);
router.post("/", authMiddleware, habitsController.createHabit);

module.exports = router;
