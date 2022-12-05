import express from "express";
import {
  registrarUsuario,
  loginUsuario,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/login", loginUsuario);
router.post("/registro", registrarUsuario);

export default router;
