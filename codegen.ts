import type { CodegenConfig } from '@graphql-codegen/cli';

const codegenConfig: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  generates: {
    './src/graphql/__generated__/schema.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default codegenConfig;
