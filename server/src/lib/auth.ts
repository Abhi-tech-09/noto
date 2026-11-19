import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";

export const auth = betterAuth({
  baseUrl: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "default-secret",
  trustedOrigins: ["http://localhost:3000", "http://localhost:8080"],
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "your-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
    },
  },
});
