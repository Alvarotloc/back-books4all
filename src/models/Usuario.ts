import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { IUsuario, IUsermethods } from "../interfaces/Usuario.interface.js";

type UserModel = Model<IUsuario, {}, IUsermethods>;

const usuarioSchema = new Schema<IUsuario, UserModel, IUsermethods>(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);
});

usuarioSchema.method("comprobarPassword", async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

// usuarioSchema.methods.comprobarPassword = async function (password: string) {
//   return await bcrypt.compare(password, this.password);
// };

const Usuario = model<IUsuario, UserModel>("Usuario", usuarioSchema);

export default Usuario;
