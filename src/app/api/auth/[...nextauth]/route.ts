import axios from "axios";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export interface session extends Session {
  user: {
    name: string,
    email: string,
    userId: string,
    token: string
  }
}
interface token extends JWT {
  jwtToken: string
}

const createToken = async (user: User) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}user/auth`,
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
        console.log(process.env.NEXT_PUBLIC_API_URL,"backend url");
        
        try {
          if (!credentials.username || !credentials.password) return;
          const data = {
            email: credentials.username,
            password: credentials.password
          }

          const loginuser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/signin`, data)
          return loginuser.data.user
        } catch (error: any) {
          return error?.data
        }
      }

    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/auth`, user);
          return true;
        } catch (error: any) {
          console.log("SignIn Error:", error.message);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        try {
          token.jwtToken = await createToken(user);
        } catch (error: any) {
          console.error("JWT Error:", error.message);
        }
      }
      return token;
    },

    // Attach the JWT token to the session
    session: async ({ session, token }) => {
      const newSession: session = session as session;
      if (newSession.user) {

        newSession.user.token = token.jwtToken as string;
      }
      return newSession!;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

