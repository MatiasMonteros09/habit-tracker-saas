const express = require("express");
const router = express.Router();

const habitsController = require("../controllers/habits.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  createHabitValidator,
} = require("../validators/habits.validator");

const validationMiddleware = require(
  "../middlewares/validation.middleware"
);

router.get("/", authMiddleware, habitsController.getHabits);

router.get("/:id", authMiddleware, habitsController.obtenerHabitPorId);

router.post("/", authMiddleware, createHabitValidator, validationMiddleware, habitsController.createHabit);

router.put("/:id",authMiddleware,habitsController.actualizarHabit);

router.delete("/:id",authMiddleware,habitsController.eliminarHabit);

module.exports = router;