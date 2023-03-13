import fetchData from "../helpers/fetchData";

export const getHomepagePosts = async () => {
    const data = await fetchData(
        `
        query HomepagePosts {
            posts {
                id
                title
                slug
            }
        }
        `,
        {
            variables: {}
        }
    )

    return data.data.posts
}
