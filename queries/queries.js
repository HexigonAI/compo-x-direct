import fetchData from '../helpers/fetchData';

export const getUser = async () => {
  const data = await fetchData(
    `query getUser{
      users_me{
          id
          first_name
      }
  }`,
    {
      variables: {},
    }
  );
  return data.data.posts;
};

export const getServers = async () => {
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
    }
  );
  return data.data.servers;
};

export const getProjects = async () => {
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
    }
  );
  return data.data.projects;
};

export const getProjectByID = async (projectId) => {
  const data = await fetchData(
    `query {
      projects_by_id(id: "${projectId}" ) {
        id
        title
      }
    }`,
    {
      variables: {},
    }
  );
  return data.data.projects_by_id;
};
