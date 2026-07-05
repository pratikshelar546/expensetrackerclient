import axios from "axios";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { API_URL } from "@/config/api";

export interface session extends Session {
  user: {
    name: string;
    email: string;
    id: string;
    token: string;
  };
}



interface BackendAuthResponse {
  token: string;
  userId: string;
}

const authenticateWithBackend = async (user: {
  name?: string | null;
  email?: string | null;
}): Promise<BackendAuthResponse> => {
  const response = await axios.post(`${API_URL}user/auth`, {
    name: user.name,
    email: user.email,
  });

  return {
    token: response.data.token,
    userId: response.data.userId,
  };
};

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials.username || !credentials.password) return null;

          const loginuser = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL || API_URL}user/signin`,
            {
              email: credentials.username,
              password: credentials.password,
            }
          );

          return {
            ...loginuser.data.user,
            apiToken: loginuser.data.token,
          };
        } catch (error: any) {
          console.error(
            "Authorize error:",
            error.response?.data || error.message
          );
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        return true;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        try {
          if (account.provider === "google") {
            const auth = await authenticateWithBackend(user);
            token.jwtToken = auth.token;
            token.id = auth.userId;
          } else if (account.provider === "credentials") {
            token.jwtToken = (user as User & { apiToken?: string }).apiToken;
            token.id = (user as User & { userId?: string }).userId as string;
          }
        } catch (error: any) {
          console.error("JWT Error:", error.message);
        }
      }
      return token;
    },
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
