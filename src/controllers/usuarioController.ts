import { Request, Response } from "express";

import { generarId } from "../helpers/generarID.js";
import Usuario from "../models/Usuario.js";

const registrarUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  if (
    [nombre, email, password].includes("") ||
    [nombre, email, password].includes(undefined)
  ) {
    const error = new Error("Todos Los Campos Son Obligatorios");
    return res.status(403).json({ msg: error.message });
  }

  const usuarioExiste = await Usuario.findOne({ email });
  if (usuarioExiste) {
    const error = new Error("Ya Existe Un Usuario Con Ese Email");
    return res.status(403).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    usuario.save();
    res.json({ msg: "Usuario Registrado Con Éxito, Revisa El Email" });
  } catch (error) {
    console.log({ error });
  }
};

export { registrarUsuario };
