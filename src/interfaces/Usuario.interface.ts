export interface IUsuario {
  nombre: string;
  email: string;
  password: string;
  confirmado: boolean;
  token: string;
}

export interface IUsermethods {
  comprobarPassword: (password: string) => boolean;
}
