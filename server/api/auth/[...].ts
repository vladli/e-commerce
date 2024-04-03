import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || "my-auth-secret",
  providers: [
    //@ts-expect-error
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});
