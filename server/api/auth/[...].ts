import { NuxtAuthHandler } from '#auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '~/server/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

type Credentials = {
  username: string;
  password: string;
};

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'my-auth-secret',
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    //@ts-expect-error
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    //@ts-expect-error
    CredentialsProvider.default({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', value: 'demo@vladli.dev' },
        password: { label: 'Password', type: 'password', value: '123' }
      },
      async authorize(credentials: Credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username,
            password: credentials.password
          }
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user ? user.id || '' : '';
        token.role = user ? (user as any).role || '' : '';
      }
      return Promise.resolve(token);
    },

    session: async ({ session, token }: any) => {
      (session as any).user.role = token.role;
      (session as any).user.id = token.id;
      return Promise.resolve(session);
    }
  }
});
