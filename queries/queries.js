import fetchData from '../helpers/fetchData';

export const getPosts = async () => {
  const data = await fetchData(
    `query getPosts{
      posts{
          id
          title
      }
  }`,
    {
      variables: {},
    }
  );
  return data.data.posts;
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
