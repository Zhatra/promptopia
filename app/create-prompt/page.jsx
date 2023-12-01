/**
 * `app/create-prompt/page.jsx`: Define la página para crear nuevos prompts en la aplicación.
 *
 * Uso del cliente:
 * - Utiliza la directiva `"use client"` para indicar que este componente debe ejecutarse solo en el lado del cliente.
 *
 * Importaciones:
 * - Hooks de React y Next.js: `useState`, `useSession`, y `useRouter` para gestionar el estado, la sesión del usuario y la navegación, respectivamente.
 * - Componente `Form` de "@components/Form" para la interfaz de usuario del formulario.
 *
 * Componente `CreatePrompt`:
 * - Utiliza el hook `useRouter` para la navegación.
 * - `useSession` de NextAuth para acceder a los datos de la sesión del usuario.
 * - Estado local `submitting` para controlar el estado de envío del formulario.
 * - Estado `post` para almacenar los datos del prompt a crear.
 *
 * Función `createPrompt`:
 * - Manejador de eventos para el envío del formulario.
 * - Utiliza `fetch` para realizar una solicitud POST a `/api/prompt/new` con los datos del prompt.
 * - Navega al inicio si el envío es exitoso.
 * - Maneja los errores y actualiza el estado de `submitting`.
 *
 * Renderizado:
 * - Devuelve el componente `Form` con props para manejar los datos del prompt, el estado de envío y la función de envío.
 *
 * Exportación:
 * - Exporta `CreatePrompt` como componente predeterminado.
 */

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;

