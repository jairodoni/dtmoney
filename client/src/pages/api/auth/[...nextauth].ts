import { throws } from 'assert/strict';
import { NextApiRequest } from 'next';
import NextAuth from 'next-auth';
import { signIn } from 'next-auth/client';
import Providers from 'next-auth/providers';
import { api } from '../../../services/api';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  session: {
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async signIn(user, account, profile) {
      try {
        await api.post('/users', user);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
