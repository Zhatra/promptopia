/**
 * `app/profile/loading.jsx`: Define un componente de carga (Loading) para la aplicación.
 *
 * Importaciones:
 * - `Image` de Next.js para optimizar y manejar imágenes.
 *
 * Componente `Loading`:
 * - Un componente funcional simple que muestra una imagen de carga.
 *
 * Estructura del JSX:
 * - Un div contenedor con clases de estilo para centrar el contenido y ocupar el ancho completo.
 * - El componente `Image` de Next.js para mostrar una imagen de carga.
 *   - `src`: Ruta de la imagen de carga (loader.svg) ubicada en 'assets/icons/'.
 *   - `width` y `height`: Dimensiones de la imagen establecidas en 50px.
 *   - `alt`: Texto alternativo 'loader' para accesibilidad.
 *   - `className`: Clase 'object-contain' para controlar el ajuste de la imagen dentro de su contenedor.
 *
 * Exportación:
 * - Exporta `Loading` como componente predeterminado, permitiendo su reutilización en otras partes de la aplicación.
 */

import Image from "next/image";

const Loading = () => {
  return (
    <div className='w-full flex-center'>
      <Image
        src='assets/icons/loader.svg'
        width={50}
        height={50}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;