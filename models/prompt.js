/**
 * `models/prompt.js`: Define el modelo de datos para 'Prompt' en MongoDB utilizando Mongoose.
 *
 * Importaciones:
 * - `Schema`, `model`, y `models` de Mongoose para la creación de esquemas y modelos de MongoDB.
 *
 * Esquema `PromptSchema`:
 * - Define la estructura y las reglas de validación para un 'Prompt'.
 * - Campos:
 *   - `creator`: Referencia al modelo 'User' mediante el tipo `ObjectId`. Representa al usuario que creó el prompt.
 *   - `prompt`: Campo de tipo `String`. Almacena el contenido del prompt. Es obligatorio (`required`).
 *   - `tag`: Campo de tipo `String`. Almacena un tag asociado al prompt. Es obligatorio (`required`).
 * - La opción `required` en `prompt` y `tag` asegura que estos campos no sean omitidos al crear un documento.
 *
 * Modelo `Prompt`:
 * - Crea o recupera el modelo 'Prompt' basado en `PromptSchema`.
 * - Utiliza la función `models.Prompt` para evitar la recompilación del modelo si ya existe.
 * - Si no existe, crea el modelo utilizando `model('Prompt', PromptSchema)`.
 *
 * Exportación:
 * - Exporta `Prompt` como el modelo predeterminado, permitiendo su uso en la aplicación para operaciones de base de datos relacionadas con prompts.
 */

import {Schema,model, models} from "mongoose";

const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    prompt:{
        type: String,
        required:[true,'Prompt is required.'],
    },
    tag:{
        type: String,
        required:[true,'Tag is required.'],
    }
});

const Prompt = models.Prompt ||  model('Prompt', PromptSchema);

export default Prompt;