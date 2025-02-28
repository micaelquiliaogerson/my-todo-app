import { NextRequest, NextResponse } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";

// Instância do Prisma
const prisma = new PrismaClient();

// Definição do schema do GraphQL
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// Resolvers do GraphQL
const resolvers = {
  Query: {
    hello: () => "Olá, GraphQL!",
  },
};

// Inicializando o Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Criando handler para Next.js
const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ prisma }),
});

// Permitir GET e POST
export { handler as GET, handler as POST };
