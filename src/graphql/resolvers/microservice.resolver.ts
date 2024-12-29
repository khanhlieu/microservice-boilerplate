import { GetMicroserviceInformationOutput } from '@graphql/__generated__/schema';
import { ApolloServerContext } from '@shared/interfaces/apolloServer.interface';

const getMicroserviceInformation = (
  _: unknown,
  __: unknown,
  context: ApolloServerContext,
): GetMicroserviceInformationOutput => {
  const { microserviceName, env } = context;

  return {
    name: microserviceName,
    env,
  };
};

export { getMicroserviceInformation };
