import axios from "axios";
import NextAuth, { Account, AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
  
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
        } catch (error) {}
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
