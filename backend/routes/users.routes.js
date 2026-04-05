const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.post("/register", usersController.registrarUsuario);
router.post("/login", usersController.loginUsuario);

module.exports = router;
