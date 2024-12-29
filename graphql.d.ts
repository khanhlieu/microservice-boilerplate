import { DocumentNode } from 'graphql';

declare module '*.graphql' {
  const Schema: DocumentNode;

  export = Schema;
}
