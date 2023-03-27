const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;
import { useSession } from 'next-auth/react';
import { getCurrentUser, getUserProjects } from '@/queries/Users';
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

  const { data: user, isSuccess } = useQuery('currentUser', async () => await fetchUser(getCurrentUser, token, {}) );

  return user
}

export function getProjects() {
  const { data: session, status } = useSession({
    required: true,
  });

  const { data: projects, isSuccess } = useQuery('userCollection', async () => await fetchUserProjects(getUserProjects, session.user.accessToken, {}), {
    enabled: status === 'authenticated',
  });

  console.log(projects)
  console.log(session);
  console.log(isSuccess);

  return projects
}




export function UserAvatar() {

}


export default fetchData;
