import mongoose from "mongoose";

const conectarDB = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI!);
    connection.then((conexion) => {
      const url = `${conexion.connection.host}:${conexion.connection.port}`;
      console.log(`MongoDB conectado en: ${url}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default conectarDB;
