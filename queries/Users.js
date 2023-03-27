import { Directus } from '@directus/sdk';

const directus = new Directus('https://compo.directus.app');

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

export const getUserProjects = 
//#graphql
`  query {
    projects {
        id
        title
    }
}
`;


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