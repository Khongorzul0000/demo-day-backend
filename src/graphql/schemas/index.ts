import mergeTypeDefs from "graphql-tools-merge-typedefs";
import { volunteerTypeDefs } from "./volunteer-schema";
import { userTypeDefs } from "./user-schema";

export const typeDefs = mergeTypeDefs([volunteerTypeDefs, userTypeDefs]);
