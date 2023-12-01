/**
 * `components/Profile.jsx`: Define el componente de perfil de usuario, mostrando información del perfil y una lista de prompts.
 *
 * Importaciones:
 * - `PromptCard` para representar individualmente cada prompt en la lista.
 *
 * Parámetros del Componente `Profile`:
 * - `name`: Nombre del usuario o título del perfil.
 * - `desc`: Descripción asociada al perfil.
 * - `data`: Array de datos de prompts asociados al perfil.
 * - `handleEdit`: Función para manejar la edición de prompts.
 * - `handleDelete`: Función para manejar la eliminación de prompts.
 *
 * Estructura del Componente:
 * - Sección con título y descripción del perfil.
 * - Lista de prompts representados por `PromptCard`.
 *   - Cada `PromptCard` recibe un prompt individual, junto con funciones `handleEdit` y `handleDelete`.
 *
 * Renderizado:
 * - Título y descripción del perfil.
 * - Itera sobre `data` para renderizar cada prompt con su respectiva funcionalidad de edición y eliminación.
 *
 * Exportación:
 * - Exporta `Profile` como componente predeterminado.
 */
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;