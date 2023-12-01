/**
 * `components/Provider.jsx`: Define el componente Provider para encapsular y manejar la sesión de usuario en la aplicación.
 *
 * Uso del cliente:
 * - Utiliza la directiva 'use client' para asegurar que el componente se ejecute solo en el lado del cliente.
 *
 * Importaciones:
 * - `SessionProvider` de NextAuth, utilizado para gestionar la sesión de autenticación del usuario.
 *
 * Componente `Provider`:
 * - Un componente de orden superior que envuelve los hijos (`children`) con el `SessionProvider`.
 * - Acepta `children`, que representa los componentes internos, y `session`, la sesión actual del usuario.
 * 
 * Funcionalidad:
 * - `SessionProvider` maneja la sesión a lo largo de la aplicación, permitiendo el acceso a los datos de la sesión en los componentes hijos.
 * - Proporciona un contexto de autenticación a toda la aplicación, facilitando el manejo de la sesión del usuario.
 *
 * Uso:
 * - Este componente se utiliza para envolver la aplicación o partes de ella que requieren acceso a la sesión del usuario.
 *
 * Exportación:
 * - Exporta `Provider` como componente predeterminado, listo para ser utilizado en la aplicación.
 */

'use client';

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider;