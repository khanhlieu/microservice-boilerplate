import * as microserviceResolver from '@graphql/resolvers/microservice.resolver';

const resolvers = {
  Query: {
    getMicroserviceInformation: microserviceResolver.getMicroserviceInformation,
  },
};

export { resolvers };
