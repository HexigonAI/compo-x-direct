const graphQLAPI = process.env.GRAPHQL;

export const fetchData = async (token, query) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(graphQLAPI, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables: {},
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  return json.data;
}
