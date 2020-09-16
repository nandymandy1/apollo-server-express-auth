import {
    gql
} from "apollo-server-express";

export default gql `
    extend type Query {
        authUser: User! @isAuth
        loginUser(username: String!, password: String!):AuthUser!
    }

    extend type Mutation {
        registerUser(newUser: UserInput!): AuthUser!
    }

    input UserInput {
        email:String!
        username:String!
        lastName: String!
        password: String!
        firstName: String!
    }

    type User {
        id: ID!
        email:String!
        username:String!
        lastName: String!
        firstName: String!
        createdAt: String
        updatedAt: String
    }

    type AuthUser {
        user: User!
        token:String!
    }
`;