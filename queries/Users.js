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
