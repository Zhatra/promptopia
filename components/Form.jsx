/**
 * `Form`: Un componente reutilizable para crear o editar prompts.
 *
 * Importaciones:
 * - `Link` de Next.js para la navegación.
 *
 * Parámetros del Componente:
 * - `type`: Indica el tipo de operación (Crear o Editar).
 * - `post`: Objeto que contiene la información del prompt.
 * - `setPost`: Función para actualizar el estado `post`.
 * - `submitting`: Estado que indica si el formulario está en proceso de envío.
 * - `handleSubmit`: Función manejadora para el envío del formulario.
 *
 * Estructura del Componente:
 * - Sección con clases de estilo para el ancho y disposición del formulario.
 * - `<h1>` y `<p>`: Textos que indican el propósito y describen la acción del formulario.
 *
 * Formulario:
 * - Se activa `handleSubmit` al enviar el formulario.
 * - Dos campos con etiquetas (`label`):
 *   - Área de texto para escribir el prompt.
 *   - Campo de entrada para especificar el tag del prompt.
 * - Cada campo tiene su propio manejador de eventos para actualizar el estado `post`.
 * - Botones para cancelar y enviar, con enlace de retorno a la página principal y botón de envío, respectivamente.
 * - El botón de envío se deshabilita cuando `submitting` es verdadero y cambia su texto según el estado.
 *
 * Exportación:
 * - Exporta `Form` como componente predeterminado.
 */

import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;