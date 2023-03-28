const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;
import { useSession } from 'next-auth/react';
import { getCurrentUser, getUserProjects } from '@/queries/Users';
import { useQuery } from 'react-query';

const fetchData = async (query, { variables = {} }, token) => {
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

  const res = await fetch(graphQLAPI + '/system', {
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

const fetchUserProjects = async (query, token, { variables = {} }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch('https://compo.directus.app/graphql/systems', {
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

  return json.data;
};


export function getUser(token) {
  const { data: user, isSuccess } = useQuery(
    'currentUser',
    async () => await fetchUser(getCurrentUser, token, {})
  );

  return user;
}


// export async function getProjects(token) {
//   const { data: projects } = useQuery(
//     'userCollection',
//     async () => await fetchUserProjects(getUserProjects, token, {})
//   );

//   return projects;
// }
export async function getProjects(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch('https://compo.directus.app/graphql/systems', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: getUserProjects,
      variables: {},
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  return json.data;
}



export default fetchData;
