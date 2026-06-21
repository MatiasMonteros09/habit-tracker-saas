const { body } = require("express-validator");

const createHabitValidator = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("frecuencia")
    .notEmpty()
    .withMessage("La frecuencia es obligatoria")

    .isIn([
      "diaria",
      "semanal",
      "mensual"
    ])
    .withMessage(
      "La frecuencia debe ser diaria, semanal o mensual"
    ),
];

module.exports = {
  createHabitValidator,
};