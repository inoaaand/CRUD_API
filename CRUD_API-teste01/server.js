import express from "express";
import cors from "cors";
import router from "./rotas/user.routes.js";
import logger from "./middleware/log.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);

app.use(express.static("public"));

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
