/**
 * `models/user.js`: Define el modelo de datos para 'User' en MongoDB utilizando Mongoose.
 *
 * Importaciones:
 * - `Schema`, `model`, y `models` de Mongoose para la creación de esquemas y modelos de MongoDB.
 *
 * Esquema `UserSchema`:
 * - Define la estructura y las reglas de validación para un 'User'.
 * - Campos:
 *   - `email`: Campo de tipo `String`. Es único y obligatorio (`required`). Contiene el correo electrónico del usuario.
 *   - `username`: Campo de tipo `String`. Es obligatorio (`required`) y sigue un patrón específico (`match`). El patrón garantiza un nombre de usuario válido y único.
 *   - `image`: Campo de tipo `String`. Almacena la URL de la imagen de perfil del usuario.
 * - Las opciones `unique` y `required` en `email` y `username` aseguran la unicidad y presencia obligatoria de estos campos.
 *
 * Modelo `User`:
 * - Crea o recupera el modelo 'User' basado en `UserSchema`.
 * - Utiliza la función `models.User` para evitar la recompilación del modelo si ya existe.
 * - Si no existe, crea el modelo utilizando `model("User", UserSchema)`.
 *
 * Exportación:
 * - Exporta `User` como el modelo predeterminado, permitiendo su uso en la aplicación para operaciones de base de datos relacionadas con usuarios.
 */

import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;