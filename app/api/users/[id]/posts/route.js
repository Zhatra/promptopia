/**
 * `app/api/users/[id]/posts/route.js`: Maneja la obtención de prompts creados por un usuario específico.
 *
 * Importaciones:
 * - Modelo `Prompt` para consultar prompts en la base de datos.
 * - `connectToDB` de "@utils/database" para la conexión con la base de datos.
 *
 * GET:
 * - Método asincrónico para manejar solicitudes GET.
 * - Utiliza `params.id` para identificar al usuario.
 * - Intenta:
 *   - Conectar a la base de datos.
 *   - Buscar prompts donde `creator` coincide con el ID del usuario.
 *   - Popula el campo `creator` para incluir detalles del creador.
 *   - Devuelve los prompts encontrados con un estado HTTP 200.
 * - Maneja errores:
 *   - Si ocurre un error, devuelve una respuesta con el mensaje "Failed to fetch prompts created by user" y un estado HTTP 500.
 *
 * Exportación:
 * - Exporta `GET` como el manejador por defecto para solicitudes GET, permitiendo la consulta de prompts asociados a un usuario específico.
 */

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 