const graphQLAPI = process.env.GRAPHQL;

export const updateProject = async (token, id, title) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const query = `
mutation {
	update_projects_item(id: "${id}", data: { title: "${title}" }) {
		id
		title
	}
}`;

  const variables = {
    title,
    id,
  };

  const response = await fetch('https://compo.directus.app/graphql/systems', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();
  return json.data;
};
