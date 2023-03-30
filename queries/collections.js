import fetchData from '../helpers/fetchData/fetchData';

export const getServers = async (token) => {
  const data = await fetchData(
    // #graphql
    `query getServers{
      servers{
          id
          title
          description
           
      }
  }`,
    {
      variables: {},
    },
    { token: token }
  );
  return data.data.servers;
};

export const getProjects = async (token) => {
  const data = await fetchData(
    // #graphql
    `query getProjects{
      projects{
          id
          title
          owner
      }
  }`,
    {
      variables: {},
    },
    { token: token }
  );
  return data.data.projects;
};

export const getProjectByID = async (projectId, token) => {
  const data = await fetchData(
    // #graphql
    `query {
      projects_by_id(id: "${projectId}" ) {
        id
        title
      }
    }`,
    {
      variables: {},
    },
    { token: token }
  );
  return data.data.projects_by_id;
};


