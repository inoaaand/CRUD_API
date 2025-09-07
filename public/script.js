const form = document.getElementById('form');
const lista = document.getElementById('lista');
let editandoId = null; // guarda o id do usuário que está sendo editado

window.onload = carregarUsuarios;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    nome: document.getElementById('nome').value,
    cpf: document.getElementById('cpf').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value,
    matricula: document.getElementById('matricula').value
  };

  if (editandoId !== null) {
    await fetch(`/usuarios/${editandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    editandoId = null;
    document.getElementById('btnSalvar').textContent = "Cadastrar";
  } else {

    await fetch('/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
  }

  carregarUsuarios();
  form.reset();
});

async function carregarUsuarios() {
  const res = await fetch('/usuarios');
  const dados = await res.json();
  localStorage.setItem('usuarios', JSON.stringify(dados));
  mostrarUsuarios();
}

function mostrarUsuarios() {
  lista.innerHTML = '';
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.forEach((u, index) => {
    const li = document.createElement('li');
    li.textContent = `${u.nome} - ${u.email}`;

    const btnEditar = document.createElement('button');
    btnEditar.textContent = "Editar";
    btnEditar.className = "editar";
    btnEditar.onclick = () => editarUsuario(u, u.id);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "excluir";
    btnExcluir.onclick = () => deletarUsuario(u.id);

    li.appendChild(btnEditar);
    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}

function editarUsuario(usuario, index) {
  document.getElementById('nome').value = usuario.nome;
  document.getElementById('cpf').value = usuario.cpf;
  document.getElementById('telefone').value = usuario.telefone;
  document.getElementById('email').value = usuario.email;
  document.getElementById('matricula').value = usuario.matricula;

  editandoId = index;
  document.getElementById('btnSalvar').textContent = "Salvar Alteração";
}

async function deletarUsuario(id) {
  await fetch(`/usuarios/${id}`, { method: 'DELETE' });
  carregarUsuarios();
}
