import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const secret = process.env.NEXTAUTH_SECRET;

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await fetch('https://compo.directus.app/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US',
          },
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error('Wrong username or password');
        }

        if (res.ok && user) {
          
          return user;
          
        } else {
          return null;
        }
      },
    }),
  ],


  session: {
    jwt: true,
  },

  jwt: secret,

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;

      return session;
    },
  },

  pages: {
    signIn: '/login-page',
  },

};

async function refreshAccessToken(tokenObject) {
  try {
      // Get a new set of tokens with a refreshToken
      const tokenResponse = await axios.post(YOUR_API_URL + 'auth/refreshToken', {
          token: tokenObject.refreshToken
      });

      return {
          ...tokenObject,
          accessToken: tokenResponse.data.accessToken,
          accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
          refreshToken: tokenResponse.data.refreshToken
      }
  } catch (error) {
      return {
          ...tokenObject,
          error: "RefreshAccessTokenError",
      }
  }
}

export default (req, res) => NextAuth(req, res, options);

