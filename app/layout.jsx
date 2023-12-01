/**
 * `app/layout.jsx`: Define el layout raíz de la aplicación con estilos globales y componentes clave.
 *
 * Importaciones:
 * - Estilos globales desde "@styles/globals.css".
 * - `Nav`: Componente de navegación desde "@components/Nav".
 * - `Provider`: Componente envolvente para contexto o estado desde "@components/Provider".
 *
 * Metadata:
 * - Objeto `metadata` que contiene el título y la descripción de la aplicación.
 *
 * Componente `RootLayout`:
 * - Función que acepta `children` como prop, representando el contenido principal.
 * - Estructura de HTML básica con `<html>` y `<body>`.
 * - Envuelve el contenido con `<Provider>` para aplicar contexto a toda la aplicación.
 * - `<div className='main'>` incluye un elemento con un gradiente, posiblemente para diseño visual.
 * - `<main className='app'>` contiene el componente `Nav` y el contenido dinámico `children`.
 *
 * Exportación:
 * - Exporta `RootLayout` como default, permitiendo su uso en otras partes de la aplicación.
 */

import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;