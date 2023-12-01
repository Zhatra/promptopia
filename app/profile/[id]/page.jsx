/**
 * `app/profile/[id]/page.jsx`: Define la página de perfil de usuario en la aplicación.
 *
 * Uso del cliente:
 * - Utiliza la directiva `"use client"` para indicar que este componente debe ejecutarse solo en el lado del cliente.
 *
 * Importaciones:
 * - Hooks `useEffect` y `useState` de React para el manejo del ciclo de vida y el estado del componente.
 * - Hook `useSearchParams` de Next.js para acceder a los parámetros de búsqueda en la URL.
 * - Componente `Profile` de "@components/Profile" para la presentación del perfil del usuario.
 *
 * Componente `UserProfile`:
 * - Acepta `params` como prop, que incluye el ID del usuario.
 * - Utiliza `useSearchParams` para obtener el nombre del usuario de la URL.
 * - Estado `userPosts` para almacenar las publicaciones del usuario.
 *
 * useEffect:
 * - Se ejecuta cuando cambia `params.id`.
 * - Define `fetchPosts` para obtener las publicaciones del usuario desde la API y actualizar el estado `userPosts`.
 *
 * Renderizado:
 * - Devuelve el componente `Profile` con el nombre del usuario, una descripción personalizada y las publicaciones del usuario.
 *
 * Exportación:
 * - Exporta `UserProfile` como componente predeterminado.
 */

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;