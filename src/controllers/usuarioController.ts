import { Request, Response } from "express";

import { generarId } from "../helpers/generarID.js";
import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

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
const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("No Existe Usuario Con Ese Email");
    return res.status(404).json({ msg: error.message });
  }
  // Comprobar si está confirmado
  if (!usuario.confirmado) {
    const error = new Error("Primero debes confirmar la cuenta");
    return res.status(403).json({ msg: error.message });
  }
  // Comprobar password
  if (!(await usuario.comprobarPassword(password))) {
    const error = new Error("La contraseña es incorrecta");
    return res.status(403).json({ msg: error.message });
  }
  const token = generarJWT(usuario._id, usuario.nombre, email);
  res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email,
    token,
  });
};

export { registrarUsuario, loginUsuario };
