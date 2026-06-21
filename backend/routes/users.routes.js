const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

const {
  registerValidator,
} = require("../validators/users.validator");

const validationMiddleware = require(
  "../middlewares/validation.middleware"
);

router.post("/register",registerValidator, validationMiddleware, usersController.registrarUsuario);
router.post("/login", usersController.loginUsuario);

module.exports = router;
