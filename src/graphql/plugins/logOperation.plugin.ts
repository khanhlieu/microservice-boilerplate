import { ApolloServerPlugin } from '@apollo/server';
import { ApolloServerContext } from '@shared/interfaces/apolloServer.interface';

const ApolloServerPluginLogOperation =
  (): ApolloServerPlugin<ApolloServerContext> => ({
    async requestDidStart() {
      return {
        async didResolveOperation(requestContext) {
          const {
            contextValue: { logger },
          } = requestContext;

          if (requestContext.operation) {
            logger.info(
              `${requestContext.operation.operation.toUpperCase()} ${requestContext.request.operationName}`,
            );
          }
        },
      };
    },
  });

export { ApolloServerPluginLogOperation };
