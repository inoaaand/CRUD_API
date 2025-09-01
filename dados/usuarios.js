let usuarios = [];

export const getUsuarios = () => usuarios;

export const addUsuario = (usuario) => {
  usuarios.push(usuario);
};

export const updateUsuario = (id, novoUsuario) => {
  usuarios[id] = { ...usuarios[id], ...novoUsuario };
};

export const deleteUsuario = (id) => {
  usuarios.splice(id, 1);
};
