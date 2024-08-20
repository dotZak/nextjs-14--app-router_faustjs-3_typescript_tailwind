import dotEnv from "dotenv-flow";
import { CodegenConfig } from "@graphql-codegen/cli";

dotEnv.config({ silent: true });

const config: CodegenConfig = {
  schema: [`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`],
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
