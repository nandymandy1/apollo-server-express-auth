import {
    gql
} from 'apollo-server-express';

export default gql `
    extend type Query {
       hello: String!
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