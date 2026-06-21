const { body } = require("express-validator");

const registerValidator = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("email")
    .isEmail()
    .withMessage("Email inválido"),

  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "La contraseña debe tener al menos 6 caracteres"
    ),
];

module.exports = {
  registerValidator,
};