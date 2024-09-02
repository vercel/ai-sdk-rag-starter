import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Configurar uno o más proveedores de autenticación
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...agregar más proveedores aquí
  ],
};

export default NextAuth(authOptions)
