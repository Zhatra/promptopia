/**
 * `app/api/prompt/route.js`: Gestiona la ruta API para obtener todos los prompts.
 *
 * Importaciones:
 * - Modelo `Prompt` para interactuar con la colección de prompts en la base de datos.
 * - Función `connectToDB` de "@utils/database" para establecer conexión con la base de datos.
 *
 * GET:
 * - Método asincrónico para manejar solicitudes GET a esta ruta.
 * - Intenta:
 *   - Conectar a la base de datos.
 *   - Obtener todos los prompts usando `Prompt.find({})`. Incluye información del creador mediante `.populate('creator')`.
 *   - Devolver los prompts en una respuesta HTTP con estado 200.
 * - Captura errores:
 *   - En caso de error, devuelve una respuesta con el mensaje "Failed to fetch all prompts" y estado HTTP 500.
 *
 * Exportación:
 * - Exporta `GET` como el manejador por defecto para solicitudes GET en esta ruta.
 */

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 