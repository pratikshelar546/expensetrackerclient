import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";

const SignInBtn = () => {
  const { data: session } = useSession();


  if (session) {
    return (
      <>
        {/* <h1>Sign in as {session.user?.email}</h1> */}
        <button onClick={() => signOut()} className="flex gap-4 items-center">
          SignOut
        </button>
      </>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex gap-4 items-center"
    >
      SignUp
    </button>
  );
};

export default SignInBtn;
