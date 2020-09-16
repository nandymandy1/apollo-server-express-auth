import {
    gql
} from 'apollo-server-express';

export default gql `
    extend type Query {
       allPosts: [Post!]!
       getPostById(id: ID!): Post!
    }

    extend type Mutation {
        createPost(newPost: PostInput): Post! @isAuth
        deletePost(id: ID!): PostMessageResponse! @isAuth
        updatePost(updatedPost: PostInput, id: ID!): Post! @isAuth
    }

    input PostInput {
        title: String!
        content: String!
        featuredImage: String
    }

    type PostMessageResponse {
        message: String!
        success: Boolean
    }

    type Post {
        id: ID!,
        author: User!
        title: String!
        content: String!
        createdAt: String!
        updatedAt: String!
        featuredImage: String
    }
`