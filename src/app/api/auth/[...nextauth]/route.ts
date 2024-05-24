import NextAuth, { AuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Bcrypt } from "../../lib/bcrypt";
import { prisma } from "@/db";
import jwt from "jsonwebtoken";

const secret = String(process.env.SECRET);

export type UserSession = {
  id: string;
  name: string;
  email: string;
  image: string;
  subscription: string;
};

export const authOptions: AuthOptions = {
  secret: secret,
  jwt: {
    decode: async ({ token }) => {
      if (!token) throw new Error("No token found");

      const user = jwt.verify(token, secret);

      return user as UserSession;
    },
    encode: async ({ token: user }) => {
      if (!user) throw new Error("No user found");

      const findUser = await prisma.user.findFirstOrThrow({
        where: { email: String(user.email) },
        include: { subscription: true },
      });

      const token = jwt.sign(
        {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          image: findUser.image,
          subscription: findUser.subscription?.planId,
        },
        secret
      );

      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365,
  },
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        const user = await prisma.user.findFirstOrThrow({
          where: { email },
          include: { subscription: true },
        });

        if (!user.password) {
          throw new Error("Credenciais inválidas");
        }

        const compare = Bcrypt.compare(password, user.password);

        if (user && compare) {
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            image: user.image,
            subscription: user.subscription?.planId,
          };
        } else {
          throw new Error("Credenciais inválidas");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.subscription = user.subscription;
      }

      return token;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        let findUser = await prisma.user.findFirst({
          where: { email: String(user.email) },
        });

        if (!findUser && profile) {
          findUser = await prisma.user.create({
            data: {
              name: String(user.name),
              email: String(user.email),
              image: String((profile as any).picture),
            },
          });
        }
      }
      return true;
    },

    async session({ session, token, user }) {
      session.user = token;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
