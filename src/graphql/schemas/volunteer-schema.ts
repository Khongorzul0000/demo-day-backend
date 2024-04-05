import gql from "graphql-tag";

export const volunteerTypeDefs = gql`
  enum Category {
    STUDY_HELP
    CLEANING
    ANIMAL
    NATURE
  }
  type Volunteer {
    id: ID!
    name: String!
    where: String!
    when: String!
    description: String!
    neededPeople: String!
    category: Category
    isDone: Boolean!
    leader: User
    attendees: [User]
  }

  input VolunteerCreateInput {
    name: String!
    where: String!
    when: String!
    category: Category!
    description: String!
    neededPeople: String!
    isDone: Boolean!
    leaderId: String!
  }

  input VolunteerUpdateInput {
    name: String!
    where: String!
    when: String!
    description: String!
    neededPeople: String!
    isDone: Boolean!
    category: Category!
  }

  type Query {
    getVolunteer(id: ID): Volunteer
    getVolunteers: [Volunteer]
    getVolunteersByCategory(category: Category!): [Volunteer]
  }

  type Mutation {
    createVolunteer(input: VolunteerCreateInput!): Volunteer
    deleteVolunteer(id: ID): Volunteer
    updateVolunteer(input: VolunteerUpdateInput!, id: ID): Volunteer
  }
`;
