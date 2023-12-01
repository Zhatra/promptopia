/**
 * `app/profile/page.jsx`: Define la página de perfil personal del usuario.
 *
 * Uso del cliente:
 * - Utiliza la directiva `"use client"` para ejecutarse solo en el lado del cliente.
 *
 * Importaciones:
 * - `useSession` de NextAuth para acceder a la sesión del usuario.
 * - Hooks `useEffect` y `useState` de React para el manejo del estado y ciclo de vida del componente.
 * - `useRouter` de Next.js para la navegación.
 * - Componente `Profile` de "@components/Profile".
 *
 * Componente `MyProfile`:
 * - Utiliza el hook `useRouter` para la navegación.
 * - Accede a los datos de sesión del usuario.
 * - Estado `myPosts` para almacenar los posts del usuario.
 *
 * useEffect:
 * - Obtiene los posts del usuario autenticado mediante una solicitud a la API y actualiza `myPosts`.
 * - Se ejecuta cada vez que cambia el ID del usuario en la sesión.
 *
 * Funciones `handleEdit` y `handleDelete`:
 * - `handleEdit`: Navega a la página de edición de un prompt específico.
 * - `handleDelete`: Elimina un prompt específico tras confirmación del usuario y actualiza la lista de posts.
 *
 * Renderizado:
 * - Devuelve el componente `Profile` con el nombre 'My', una descripción personalizada, los posts del usuario y manejadores para editar y eliminar posts.
 *
 * Exportación:
 * - Exporta `MyProfile` como componente predeterminado.
 */

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;