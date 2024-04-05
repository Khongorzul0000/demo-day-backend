import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    username: String
    password: String
    email: String
    id: ID
  }

  input UserCreateInput {
    username: String!
    password: String
    email: String!
  }

  input UserSignInInput {
    username: String!
    password: String
  }
  type Query {
    getUser(id: ID): User
    getUsers: [User]
  }

  type Mutation {
    createUser(input: UserCreateInput!): User
    signInUser(input: UserSignInInput!): User
    registerForVolunteer(volunteerId: ID, userId: ID): Volunteer
  }
`;
