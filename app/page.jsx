/**
 * Página principal de la aplicación, definida en `app/page.jsx`.
 * Utiliza Next.js y componentes de Tailwind CSS para el estilo.
 *
 * Componentes:
 * - `Feed`: Importado desde "@components/Feed", muestra contenido dinámico, posiblemente una lista de prompts.
 *
 * JSX:
 * - `<section>`: Contenedor principal con estilo de flexbox y columna.
 * - `<h1>`: Encabezado principal con texto "Discover & Share" y "AI-Powered Prompts" en un gradiente naranja.
 * - `<p>`: Descripción de "Promptopia" como herramienta de prompting AI de código abierto.
 * - `<Feed />`: Integración del componente Feed para mostrar contenido relevante.
 *
 * Exportación:
 * - Exporta `Home` como componente predeterminado.
 */

import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> AI-Powered Prompts</span>
    </h1>
    <p className='desc text-center'>
      Promptopia is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>

    <Feed />
  </section>
);

export default Home;