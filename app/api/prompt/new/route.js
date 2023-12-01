/**
 * `app/api/prompt/new/route.js`: Gestiona la creación de un nuevo prompt en la base de datos.
 *
 * Importaciones:
 * - Modelo `Prompt` para crear nuevas instancias de prompts.
 * - Función `connectToDB` para establecer la conexión con la base de datos.
 *
 * POST:
 * - Método asincrónico para manejar solicitudes POST.
 * - Extrae `userId`, `prompt`, y `tag` del cuerpo de la solicitud (JSON).
 * - Intenta:
 *   - Conectar a la base de datos.
 *   - Crear un nuevo prompt con los datos proporcionados.
 *   - Guardar el nuevo prompt en la base de datos.
 *   - Devolver una respuesta con el nuevo prompt y estado HTTP 201, indicando la creación exitosa.
 * - Captura y maneja errores:
 *   - Si hay un fallo al crear el prompt, devuelve una respuesta con el mensaje "Failed to create a new prompt" y estado HTTP 500.
 *
 * Exportación:
 * - Exporta `POST` como el manejador por defecto para solicitudes POST en esta ruta, permitiendo la creación de nuevos prompts.
 */

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}