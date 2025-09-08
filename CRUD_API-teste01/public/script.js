const form = document.getElementById('form');
const lista = document.getElementById('lista');
let editandoId = null; // guarda o id do usuário que está sendo editado
const baseUrl = 'http://localhost:3000';

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
    await fetch(`${baseUrl}/usuarios/${editandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    editandoId = null;
    document.getElementById('btnSalvar').textContent = "Cadastrar";
  } else {
    await fetch(`${baseUrl}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
  }

  await carregarUsuarios();
  form.reset();
});

async function carregarUsuarios() {
  const res = await fetch(`${baseUrl}/usuarios`);
  const dados = await res.json();
  localStorage.setItem('usuarios', JSON.stringify(dados));
  mostrarUsuarios();
}

function mostrarUsuarios() {
  lista.innerHTML = '';
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.forEach((u) => {
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

function editarUsuario(usuario, id) {
  document.getElementById('nome').value = usuario.nome;
  document.getElementById('cpf').value = usuario.cpf;
  document.getElementById('telefone').value = usuario.telefone;
  document.getElementById('email').value = usuario.email;
  document.getElementById('matricula').value = usuario.matricula;

  editandoId = id;
  document.getElementById('btnSalvar').textContent = "Salvar Alteração";
}

async function deletarUsuario(id) {
  await fetch(`${baseUrl}/usuarios/${id}`, { method: 'DELETE' });
  carregarUsuarios();
}
