const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;

export const fetchUser = async (query, token, { variables = {} }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const res = await fetch('https://compo.directus.app/graphql/system', {
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