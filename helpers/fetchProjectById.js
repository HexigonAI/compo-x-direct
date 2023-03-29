const graphQLAPI = process.env.GRAPHQL;

export const fetchProjectById = async (token, projectId) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const query = `
      query {
        projects_by_id(id: "${projectId}" ) {
          id
          title
        }
      }
    `;
  
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
  
    return json.data.projects_by_id;
  }
  
  
  