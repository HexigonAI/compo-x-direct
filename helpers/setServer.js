const graphQLAPI = process.env.GRAPHQL;

export const setServer = async (token, title, description) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const query = `
    mutation {
        create_servers_item(data: { title: "${title}", description: "${description}" }, ) {
          id
          title
        }
      }
    `;

  const variables = {
    title,
    description,
  };

  fetch('https://compo.directus.app/graphql/systems', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // const data = await response.json();
  // return data.data;
};
