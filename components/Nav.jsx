/**
 * `components/Nav.jsx`: Define el componente de navegación (Nav) para la aplicación.
 *
 * Uso del cliente:
 * - Utiliza la directiva `"use client"` para asegurar que se ejecute solo en el lado del cliente.
 *
 * Importaciones:
 * - `Link` y `Image` de Next.js para la navegación y la optimización de imágenes.
 * - Hooks de React y NextAuth para manejar el estado y la sesión del usuario.
 *
 * Componente `Nav`:
 * - Utiliza el hook `useSession` de NextAuth para acceder a los datos de sesión del usuario.
 * - Estado `providers` para almacenar los proveedores de autenticación.
 * - Estado `toggleDropdown` para manejar la visibilidad del menú desplegable en móviles.
 *
 * useEffect:
 * - Obtiene los proveedores de autenticación y actualiza el estado `providers`.
 *
 * Estructura del Componente:
 * - Navegación con logo y enlace a la página principal.
 * - Navegación para escritorio y móvil:
 *   - Si el usuario está autenticado, muestra opciones de crear post, salir y un enlace al perfil.
 *   - Si no está autenticado, muestra botones para iniciar sesión con los proveedores disponibles.
 * - Manejo de clics para la autenticación y navegación.
 *
 * Renderizado:
 * - Navegación para escritorio y móvil con lógica condicional basada en la sesión del usuario.
 *
 * Exportación:
 * - Exporta `Nav` como componente predeterminado.
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;