import axios from "axios";
import NextAuth, { Account, AuthOptions, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

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
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google") {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/auth`, user);
        } catch (error: any) {
          console.log(error.message);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }: { token: any; user: User }) {
      if (user) {
        try {
          token.jwt = await createToken(user);
        } catch (error: any) {
          console.error("JWT Error:", error.message);
        }
      }
      return token;
    },

    // Attach the JWT token to the session
    async session({ session, token }: { session: any; token: any }) {
      session.jwt = token.jwt;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
