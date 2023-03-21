import { getSession } from 'next-auth/react';

export const requireAuth = async (context, callback) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login-page',
        permanent: false,
      },
    };
  }

  return callback();
};
