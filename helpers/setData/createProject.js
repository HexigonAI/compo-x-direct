const graphQLAPI = process.env.GRAPHQL;

//TODO: add a title argument and concatentate it with the query
export const createProject = async (token, id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

const query = `
  mutation {
	create_projects_item(data: { title: "New Project", server_id: {id: "${id}"} }) {
		id
		title
        server_id{
            id
        }
	}
}`;

  const variables = {
    // title,
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
  return json.data.create_projects_item.id;

};
