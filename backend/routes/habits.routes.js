const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habits.controller");

router.get("/", habitsController.getHabits);
router.post("/", habitsController.createHabit);

module.exports = router;
