import fs from 'fs';
import url from 'url';
import path from 'path';
import http from 'http';
import gql from 'graphql-tag';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLogOperation } from '@graphql/plugins/logOperation.plugin';
import { ApolloServerContext } from '@shared/interfaces/apolloServer.interface';
import { resolvers } from '@graphql/resolvers/index.resolver';
import { logger } from '@configs/logger.config';

const {
  MICROSERVICE_NAME,
  PORT,
  ENV,
  LOG_LEVEL,
  COOKIE_PARSER_SECRET,
  MONGODB_URI,
} = process.env;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = gql(
  fs.readFileSync(path.resolve(__dirname, './src/graphql/schema.graphql'), {
    encoding: 'utf-8',
  }),
);

const initializeApolloServer = async ({
  httpServer,
  expressApp,
}: {
  httpServer: http.Server;
  expressApp: express.Express;
}): Promise<void> => {
  logger.info('Initializing Apollo server...');

  if (
    MICROSERVICE_NAME === undefined ||
    PORT === undefined ||
    ENV === undefined ||
    LOG_LEVEL === undefined ||
    COOKIE_PARSER_SECRET === undefined ||
    MONGODB_URI === undefined
  ) {
    logger.error('An error occurred when initializing Apollo server!');
    throw new Error('Missing environment variable!');
  }

  const apolloServer = new ApolloServer<ApolloServerContext>({
    typeDefs,
    resolvers,
    logger,
    // Enables schema introspection when not in the production environment.
    introspection: ENV !== 'production',
    // Returns a 400 instead of 200 status code when variable coercion errors occur.
    status400ForVariableCoercionErrors: true,
    plugins: [
      ApolloServerPluginLogOperation(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await apolloServer.start();
  logger.info('Initialized Apollo server!');

  expressApp.use(
    '/graphql',
    expressMiddleware<ApolloServerContext>(apolloServer, {
      context: async ({ req, res }) =>
        new Promise((resolve) => {
          resolve({
            microserviceName: MICROSERVICE_NAME,
            port: PORT,
            env: ENV,
            logLevel: LOG_LEVEL,
            mongodbUri: MONGODB_URI,
            req,
            res,
            logger,
          });
        }),
    }),
  );
};

export { initializeApolloServer };
