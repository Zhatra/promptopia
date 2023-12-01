/**
 * `app/api/auth/[...nextauth]/route.js`: Configura la autenticación para la aplicación usando NextAuth.
 *
 * Importaciones:
 * - `NextAuth`: Biblioteca principal para manejar la autenticación.
 * - `GoogleProvider`: Proveedor de autenticación de Google.
 * - Modelo `User` y función `connectToDB` para interacciones con MongoDB.
 *
 * Handler de NextAuth:
 * - Define el proveedor de autenticación de Google con credenciales de entorno.
 * - Implementa callbacks para la sesión y el proceso de inicio de sesión.
 *
 * Callbacks:
 * - `session`: Encontrar y adjuntar la ID de usuario de MongoDB a la sesión actual.
 * - `signIn`: Gestiona el inicio de sesión.
 *   - Conecta a la base de datos.
 *   - Verifica si el usuario ya existe en la base de datos.
 *   - Si no existe, crea y guarda un nuevo usuario.
 *   - Captura y registra errores durante la verificación.
 *
 * Exportación:
 * - Exporta `handler` como métodos GET y POST, compatibles con las rutas de autenticación de NextAuth.
 */

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }