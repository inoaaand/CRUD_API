import { Router } from "express";
import { getUsuarios, addUsuario, updateUsuario, deleteUsuario } from "../dados/usuarios.js";

const router = Router();

router.post("/usuarios", (req, res) => {
  const { nome, cpf, telefone, email, matricula } = req.body;
  if (!nome || !cpf || !telefone || !email || !matricula) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }
  addUsuario({ nome, cpf, telefone, email, matricula });
  res.json({ message: "Usuário cadastrado com sucesso!" });
});


router.get("/usuarios", (req, res) => {
  res.json(getUsuarios());
});

router.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const usuarios = getUsuarios();
  if (!usuarios[id]) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
  updateUsuario(id, req.body);
  res.json({ message: "Usuário atualizado com sucesso!" });
});


router.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const usuarios = getUsuarios();
  if (!usuarios[id]) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
  deleteUsuario(id);
  res.json({ message: "Usuário removido com sucesso!" });
});

export default router;
