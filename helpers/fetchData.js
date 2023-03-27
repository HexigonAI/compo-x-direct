const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;
import { useSession } from 'next-auth/react';
import { getCurrentUser } from '@/queries/Users';
import { useQuery } from 'react-query';

const fetchData = async (query, token, { variables = {} }) => {
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

export function fetchUser() {
  const { data: session, status } = useSession({
    required: true,
  });

  const { data: user, isSuccess } = useQuery('currentUser', async () => await fetchData(getCurrentUser, session.user.accessToken, {}), {
    enabled: status === 'authenticated',
  });

  console.log(user)
  console.log(session);
  console.log(isSuccess);

  return user
}





export function UserAvatar() {

}


export default fetchData;
