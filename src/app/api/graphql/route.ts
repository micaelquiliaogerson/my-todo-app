import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";

// Instância do Prisma
const prisma = new PrismaClient();

// Definição do schema do GraphQL
const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(title: String!, description: String): Task!
    updateTask(id: ID!, completed: Boolean!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

// Resolvers do GraphQL
const resolvers = {
  Query: {
    tasks: async (_parent: unknown, _args: unknown, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.task.findMany();
    },
  },
  Mutation: {
    createTask: async (_parent: unknown, { title, description }: { title: string; description?: string }, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.task.create({
        data: { title, description, completed: false },
      });
    },
    updateTask: async (_parent: unknown, { id, completed }: { id: string; completed: boolean }, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.task.update({
        where: { id },
        data: { completed },
      });
    },
    deleteTask: async (_parent: unknown, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
      await prisma.task.delete({ where: { id } });
      return true;
    },
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
