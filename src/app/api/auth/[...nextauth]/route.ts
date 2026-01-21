import axios from "axios";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { API_URL } from "@/config/api";

export interface session extends Session {
  user: {
    name: string,
    email: string,
    id: string,
    token: string
  }
}
interface token extends JWT {
  jwtToken: string
  id: string
}

const createToken = async (user: User) => {
  try {
    const response = await axios.post(
      `${API_URL}user/auth`,
      user
    );

    return response.data.token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials.username || !credentials.password) return;
          const data = {
            email: credentials.username,
            password: credentials.password
          }

          const loginuser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || API_URL}user/signin`, data)
          return loginuser.data.user
        } catch (error: any) {
          console.error("Authorize error:", error.response?.data || error.message);
          return error?.data
        }
      }

    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await axios.post(`${API_URL}user/auth`, user);
          return true;
        } catch (error: any) {
          console.log("SignIn Error:", error.message);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Persist userId from the user object into the JWT, so we can attach it to session.user below.
      if (user && account) {
        try {
          token.jwtToken = await createToken(user);
          // Attach userId if exists (for both Google and Credentials sign-in)
          if (user) {
            // @ts-ignore
            token.id= user?.userId as string;
          }
        } catch (error: any) {
          console.error("JWT Error:", error.message);
        }
      }
      return token;
    },

    // Attach the JWT token and userId to the session
    session: async ({ session, token }) => {
      const newSession: session = session as session;
      if (newSession.user) {        
        newSession.user.token = token.jwtToken as string;
        newSession.user.id = token.id as string;
      }
      return newSession!;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

