const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.post("/register", usersController.registrarUsuario);

module.exports = router;
