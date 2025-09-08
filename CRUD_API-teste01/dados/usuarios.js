let usuarios = [];
let idCounter = 0;

export const obterUsuarios = () => usuarios;

export const adicionarUsuario = (usuario) => {
  const novoUsuario = { id: idCounter++, ...usuario };
  usuarios.push(novoUsuario);
  return novoUsuario;
};

export const atualizarUsuario = (id, novosDados) => {
  const index = usuarios.findIndex(u => u.id == Number(id));
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...novosDados };
    return usuarios[index];
  }
  return null;
};

export const removerUsuario = (id) => {
  const index = usuarios.findIndex(u => u.id == Number(id));
  if (index !== -1) {
    return usuarios.splice(index, 1)[0];
  }
  return null;
};
