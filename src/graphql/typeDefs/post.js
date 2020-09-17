import {
    gql
} from 'apollo-server-express';

export default gql `
    extend type Query {
       allPosts: [Post!]!
       getPostById(id: ID!): Post!
       getMyPostsWithPagination(page: Int, limit: Int): PostPaginator!
       getPostsWithPagination(page: Int, limit: Int, user_id: ID): PostPaginator!
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

    type PostPaginator {
        posts: [Post!]!
        paginator: Paginator!
    }

    type Paginator {
        slNo: Int
        prev: Int
        next: Int
        perPage: Int
        totalPosts: Int
        totalPages: Int
        currentPage: Int
        hasPrevPage: Boolean
        hasNextPage: Boolean
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