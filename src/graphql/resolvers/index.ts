import { volunteerQueries } from "./queries/volunteer-queries"
import { volunteerMutations } from "./mutations/volunteer-mutations"
import { userQueries } from "./queries/user-queries";
import { userMutations } from "./mutations/user-mutations";
export const resolvers = {
  Query: {
    ...volunteerQueries,
    ...userQueries,
  },
  Mutation: {
    ...volunteerMutations,
    ...userMutations,
  },
};
