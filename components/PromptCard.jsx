/**
 * `components/PromptCard.jsx`: Define un componente para visualizar y manejar acciones en un prompt individual.
 *
 * Uso del cliente:
 * - Utiliza la directiva `"use client"` para garantizar que el componente se ejecute solo en el lado del cliente.
 *
 * Importaciones:
 * - Hooks de React y NextAuth para manejar el estado y la sesión del usuario.
 * - `Image` de Next.js para la optimización de imágenes.
 * - Hooks `usePathname` y `useRouter` de Next.js para la navegación.
 *
 * Parámetros del Componente `PromptCard`:
 * - `post`: Objeto que contiene la información del prompt.
 * - `handleEdit`: Función para editar el prompt.
 * - `handleDelete`: Función para eliminar el prompt.
 * - `handleTagClick`: Función para manejar el clic en el tag del prompt.
 *
 * Estructura y Funcionalidad:
 * - Muestra información del creador del prompt y el contenido del prompt.
 * - Proporciona botones para copiar el prompt, editar y eliminar, según las condiciones de la sesión y la ruta.
 * - Manejadores de eventos para acciones como copiar el prompt, navegar al perfil del creador y ejecutar funciones de edición y eliminación.
 *
 * Renderizado:
 * - Contenedor con información del creador y botón para copiar el prompt.
 * - Muestra el contenido del prompt y su tag.
 * - Opciones de edición y eliminación si el usuario es el creador y está en su perfil.
 *
 * Exportación:
 * - Exporta `PromptCard` como componente predeterminado.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;