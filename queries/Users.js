export const getCurrentUser =
  //#graphql
  `   query {
        users_me {
            email
            first_name
            last_name
            avatar
                {
                    id
                    height
                    storage
                    charset
                    location
                    width
                }
        }
    }
`;

export const getUserServers =
  // #graphql
  `query {
      servers{
          id
          title
          description
      }
  }`;

export const getUserProjects =
  //#graphql
`  query {
    servers{
        id
        title
            projects{
                id
                title
            }
        }
    }`;

export const createNewUser = `
    #graphql
    mutation createNewUser($data: create_directus_users_input!) {
        create_users_item(data: $data)
    }
`;

export const loginUser = `
    #graphql
    mutation {
        auth_login(email: "123@hotmail.com", password: "12345678") {
            access_token
            refresh_token
        }
    }
`;
