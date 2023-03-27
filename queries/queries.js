import fetchData from '../helpers/fetchData';
import { Directus } from '@directus/sdk';

const directus = new Directus('https://compo.directus.app');

export const getCurrentUser = async (bearerToken) => {
  try {
    const data = await fetchUser(
       // #graphql
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
      {token: bearerToken}
    );
    return data.data.users_me;
  } catch (error) {
    console.error(`Error fetching current user: ${error}`);
    return `Error fetching current user: ${error}`; 
  }
};

export const getAllUsers = async () => {

  const d = await directus.users.me.read('d2c6d992-0e6b-4599-a16b-b95bbcbc81f5');
  console.log(d)
  console.log("test")
  // #graphql
  `query {
    users {
      first_name
      last_name
      email
    }
  }`
}

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
