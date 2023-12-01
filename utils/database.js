/**
 * `utils/database.js`: Proporciona una utilidad para conectar la aplicación a MongoDB utilizando Mongoose.
 *
 * Importaciones:
 * - `mongoose`: Biblioteca de Mongoose para trabajar con MongoDB.
 *
 * Variable `isConnected`:
 * - Mantiene un seguimiento del estado de la conexión a la base de datos para evitar conexiones redundantes.
 *
 * Función `connectToDB`:
 * - Asíncrona, gestiona la conexión a la base de datos MongoDB.
 * - Configura `mongoose` para utilizar `strictQuery`, lo que asegura un manejo estricto de las consultas.
 * - Verifica si la conexión ya existe para evitar reconexiones.
 * - Intenta conectar a MongoDB utilizando la URI de conexión almacenada en `process.env.MONGODB_URI`.
 * - Configura opciones adicionales para la conexión, como el nombre de la base de datos (`dbName`) y parámetros de conexión (`useNewUrlParser`, `useUnifiedTopology`).
 * - Actualiza el estado de `isConnected` a `true` después de una conexión exitosa.
 * - Maneja y registra cualquier error durante el intento de conexión.
 *
 * Uso:
 * - Esta función se puede importar y utilizar en otras partes de la aplicación para establecer una conexión con MongoDB.
 *
 * Exportación:
 * - Exporta `connectToDB` para su uso en la aplicación.
 */

import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}