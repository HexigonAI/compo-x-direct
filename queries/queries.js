import fetchData from '../helpers/fetchData';

export const getCurrentUser = async (token) => {
  const data = await fetchData(
    `query getCurrentUser{
      users_me {
        id
        email
        first_name
      }
    }`,
    {
      variables: {},
    },
    { token: token }
  );
  return data.data.users_me;
};

export const getServers = async (token) => {
  const data = await fetchData(
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
