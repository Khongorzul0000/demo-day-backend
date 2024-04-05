import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schemas";

const prisma = new PrismaClient();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
});

console.log("HELLOWORLD!");
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
