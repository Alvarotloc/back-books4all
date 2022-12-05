import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  confirmarCuenta,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/login", loginUsuario);
router.post("/registro", registrarUsuario);
router.get("/confirmar-cuenta/:token", confirmarCuenta);

export default router;
