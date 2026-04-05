const usersService = require("../services/users.service");

const registrarUsuario = async (req, res) => {
  try {
    const usuario = await usersService.registrarUsuario(req.body);

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const usuario = await usersService.loginUsuario(req.body);

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
};
