import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  // Extend session to hold the access_token
  interface Session {
    jwt: string & DefaultSession;
    user:{
      name?: string | null
      email?: string | null
      image?: string | null
      token?: string | null
    }
  }

  interface User{
    token?:string | null
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT {
    access_token: string & DefaultJWT;
  }
}
