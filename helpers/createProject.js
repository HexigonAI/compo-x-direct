const graphQLAPI = process.env.GRAPHQL;

//TODO: add a title argument and concatentate it with the query
export const createProject = async (token, id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

const query = `
  mutation {
	create_projects_item(data: { title: "TEST TITLE TEST TITLE", server_id: {id: "${id}"} }) {
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

  fetch('https://compo.directus.app/graphql/systems', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });
};
