import { NuxtAuthHandler } from '#auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '~/server/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'my-auth-secret',
  //@ts-expect-error
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    //@ts-expect-error
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user ? user.id || '' : '';
        token.role = user ? (user as any).role || '' : '';
      }
      return Promise.resolve(token);
    },

    session: async ({ session, token }) => {
      (session as any).user.role = token.role;
      (session as any).user.id = token.id;
      return Promise.resolve(session);
    }
  }
});
