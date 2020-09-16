import {
    gql
} from 'apollo-server-express';

export default gql `
    extend type Query {
       allPosts: [Post!]!
    }

    extend type Mutation {
        createPost(newPost: PostInput): Post! @isAuth
        updatePost(updatedPost: PostInput): Post! @isAuth
    }

    input PostInput {
        title: String!
        content: String!
        featuredImage: String
    }

    type Post {
        id: ID!,
        title: String!
        content: String!
        createdAt: String!
        updatedAt: String!
        featuredImage: String
    }
`