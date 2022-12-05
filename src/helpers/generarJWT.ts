import jwt from "jsonwebtoken";

const generarJWT = (_id: any, nombre: string, email: string) => {
  const token = jwt.sign(
    {
      _id,
      nombre,
      email,
    },
    process.env.JWT_SECRETKEY!,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

export default generarJWT;
