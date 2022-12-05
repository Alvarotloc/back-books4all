import express from "express";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import conectarDB from "./config/dbconfig.js";

dotenv.config();

const app = express();

app.use(express.json());

conectarDB();

app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
