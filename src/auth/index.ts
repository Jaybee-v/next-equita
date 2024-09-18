import NextAuth, { DefaultSession, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const BASE_PATH = "/api/auth";

declare module "next-auth" {
  interface User {
    id?: string;
    email?: string | null;
    name?: string | null;
    lastname?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      lastname: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession["user"];
  }
}

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
        },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        console.log("Attempting to authorize user:", credentials.username);
        const user = await prisma.user.findUnique({
          where: { email: credentials.username as string },
        });
        console.log("User found:", user);

        if (!user) {
          console.log("No user found");
          return null;
        }

        if (user.password !== credentials.password) {
          console.log("Password mismatch");
          return null;
        }

        const authenticatedUser: User = {
          id: user.id,
          email: user.email as string,
          lastname: user.lastname as string,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        };
        console.log("Authenticated user:", authenticatedUser);
        return authenticatedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.lastname = user.lastname;
        token.role = user.role;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.lastname = token.lastname as string;
        session.user.role = token.role as string;
        session.user.createdAt = token.createdAt as string;
        session.user.updatedAt = token.updatedAt as string;
      }
      console.log("Session created:", session);
      return session;
    },
  },
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    buttonText: "Se connecter",
  },
  pages: {
    signIn: "/signin",
  },
  debug: true, // Enable debug mode
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
