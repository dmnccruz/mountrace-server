const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }
    type Screen {
        id: ID!
        createdAt: String!
        firstName: String!
        lastName: String!
        age: String!
        address: String!
        mobile: String!
        temp: String!
        travel: String!
        symptoms: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        firstName: String!
        lastName: String!
        createdAt: String!
        responded: Boolean
        condition: String!
        role: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        firstName: String!
        lastName: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getScreens: [Screen]
        getScreen(screenId: ID!): Screen
        getUsers: [User]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        createScreen(age: String!, address: String!, mobile: String!, temp: String!, travel: String!, symptoms: String!): Screen!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
    type Subscription {
        newPost: Post!
    }
`;