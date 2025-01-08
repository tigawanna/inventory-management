import { generateSchemaTypes } from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  inventory: {
    from: {
      relativePath: "./poenapi.json",
      source: "file",
    },
    outputDir: "./src/lib/api",
    to: async (context) => {
      await generateSchemaTypes(context, {
        filenamePrefix: "inventory",
      });
    },
  },
});
