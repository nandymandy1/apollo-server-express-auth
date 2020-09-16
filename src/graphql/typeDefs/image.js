import {
    gql
} from "apollo-server-express";


export default gql `
    extend type Query {
        hello: String!
    }

    extend type Mutation {
        imageUploader(file: Upload!): String! @isAuth
    }

`