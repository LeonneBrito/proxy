import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const { signIn, signUp, useSession, signOut, } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [usernameClient()],
});
