const form = document.getElementById('form');
const lista = document.getElementById('lista');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    nome: document.getElementById('nome').value,
    cpf: document.getElementById('cpf').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value,
    matricula: document.getElementById('matricula').value
  };

  const res = await fetch('/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });

  const novo = await res.json();
  salvarLocal(novo);
  mostrarUsuarios();
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
  usuarios.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.nome} - ${u.email}`;
    const btn = document.createElement('button');
    btn.textContent = "Excluir";
    btn.onclick = () => deletarUsuario(u.id);
    li.appendChild(btn);
    lista.appendChild(li);
  });
}


async function deletarUsuario(id) {
  await fetch(`/usuarios/${id}`, { method: 'DELETE' });
  carregarUsuarios();
}

function salvarLocal(usuario) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
