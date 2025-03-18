import axios from "axios";
import NextAuth, { Account, AuthOptions, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/auth`, user);
        } catch (error: any) {
          console.log(error.message);
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
