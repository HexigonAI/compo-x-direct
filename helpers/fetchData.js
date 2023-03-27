const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;

import { useSession } from 'next-auth/react';
import { getCurrentUser } from '@/queries/Users';
import { useQuery } from 'react-query';

const fetchData = async (query, { variables = {} }, token ) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(graphQLAPI, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  return json;
};

const fetchUser = async (query, token, { variables = {} }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(graphQLAPI+'/system', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  return json.data.users_me;
};

export function getUser(token) {
  // const { data: session, status } = useSession({
  //   required: true,
  // });

  const { data: user, isSuccess } = useQuery('currentUser', async () => await fetchUser(getCurrentUser, token, {}) );
  
  // console.log(isSuccess);

  return user
}

export default fetchData;
