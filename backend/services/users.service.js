const usersRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//aqui validamos los datos y si falta alguno da error
const registrarUsuario = async (data) => {
  const { nombre, email, password } = data;

  if (!nombre || !email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const usuario = await usersRepository.crearUsuario(
    nombre,
    email,
    hashedPassword,
  );

  return usuario;
};

const loginUsuario = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email y password son obligatorios");
  }

  const usuario = await usersRepository.obtenerUsuarioPorEmail(email);

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const passwordValido = await bcrypt.compare(password, usuario.password);

  if (!passwordValido) {
    throw new Error("Password incorrecto");
  }

  const token = jwt.sign(
  { userId: usuario.id },
  "mi_clave_super_secreta_2026",
  { expiresIn: "24h" }
);

return {
  user: {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email
  },
  token
};
};

module.exports = {
  registrarUsuario,
  loginUsuario,
};
