const usersRepository = require("../repositories/users.repository");

//aqui validamos los datos y si falta alguno da error
const registrarUsuario = async (data) => {
  const { nombre, email, password } = data;

  if (!nombre || !email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  const usuario = await usersRepository.crearUsuario(nombre, email, password);

  return usuario;
};

module.exports = {
  registrarUsuario,
};
