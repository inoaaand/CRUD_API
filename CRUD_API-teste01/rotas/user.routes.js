import { Router } from "express";
import { obterUsuarios, adicionarUsuario, atualizarUsuario, removerUsuario } from "../dados/usuarios.js";

const router = Router();

router.post("/usuarios", (req, res) => {
  const { nome, cpf, telefone, email, matricula } = req.body;
  if (!nome || !cpf || !telefone || !email || !matricula) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }
  const novo = adicionarUsuario({ nome, cpf, telefone, email, matricula });
  res.json(novo);
});


router.get("/usuarios", (req, res) => {
  res.json(obterUsuarios());
});

router.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const atualizado = atualizarUsuario(id, req.body);
  if (!atualizado) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
  res.json(atualizado);
});


router.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const removido = removerUsuario(id);
  if (!removido) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
  res.json(removido);
});

export default router;
