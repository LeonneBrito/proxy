import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins"
import { Pool } from "pg";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username(),
  ],
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});
