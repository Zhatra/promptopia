/**
 * `app/api/prompt/[id]/route.js`: Maneja operaciones de API específicas para un prompt identificado por su ID.
 *
 * Importaciones:
 * - Modelo `Prompt` para interactuar con la colección de prompts en la base de datos.
 * - Función `connectToDB` para la conexión con la base de datos.
 *
 * GET:
 * - Método asincrónico para manejar solicitudes GET.
 * - Intenta:
 *   - Conectar a la base de datos.
 *   - Buscar un prompt específico por ID y popularlo con información del creador.
 *   - Si el prompt no se encuentra, devuelve un error 404.
 *   - Si se encuentra, devuelve el prompt con estado 200.
 * - Maneja errores internos del servidor con una respuesta de estado 500.
 *
 * PATCH:
 * - Método asincrónico para actualizar un prompt específico.
 * - Recibe datos del prompt y tag del cuerpo de la solicitud.
 * - Intenta:
 *   - Conectar a la base de datos.
 *   - Encontrar el prompt por ID y actualizar sus datos.
 *   - Si el prompt no se encuentra, devuelve un error 404.
 *   - Si se actualiza con éxito, devuelve una confirmación con estado 200.
 * - Maneja errores internos del servidor con una respuesta de estado 500.
 *
 * DELETE:
 * - Método asincrónico para eliminar un prompt específico.
 * - Intenta:
 *   - Conectar a la base de datos.
 *   - Eliminar el prompt por ID.
 *   - Devuelve una confirmación de eliminación con estado 200.
 * - Maneja errores internos del servidor con una respuesta de estado 500.
 *
 * Exportación:
 * - Exporta los métodos GET, PATCH y DELETE para ser utilizados en las solicitudes correspondientes.
 */

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};