import { defineConfig } from "@kubb/core";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginClient } from "@kubb/plugin-client";

export default defineConfig(() => {
  return {
    root: ".",
    input: {
      path: "./openapi.json",
    },
    output: {
      path: "./src/lib/kubb/gen",
    },

    plugins: [
      pluginOas({
        group: { type: "tag", name: ({ group }) => `${group}Oas` },
      }),
      pluginTs({
        group: {
          type: "tag",
          name: ({ group }) => `'${group}Controller`,
        },
        enumType: "asConst",
        enumSuffix: "Enum",
        dateType: "date",
        unknownType: "unknown",
        optionalType: "questionTokenAndUndefined",
        oasType: false,
      }),
      pluginClient({
        // output: {
        //     path: "./clients/axios",
        //     barrelType: "named",
        //     banner: "/* eslint-disable no-alert, no-console */",
        //     footer: "",
        // },
        group: {
          type: "tag",
          name: ({ group }) => `${group}Service`,
        },
        transformers: {
          name: (name, type) => {
            return `${name}Client`;
          },
        },
        importPath: "@/lib/kubb/custom-fetch-client.ts",
        operations: true,
        parser: "client",
        exclude: [
          {
            type: "tag",
            pattern: "store",
          },
        ],
        pathParamsType: "object",
        dataReturnType: "full",
        client: "fetch",
      }),
      pluginZod({
        output: {
          path: "./zod",
        },
        group: { type: "tag", name: ({ group }) => `${group}Schemas` },
        typed: true,
        dateType: "stringOffset",
        unknownType: "unknown",
        importPath: "zod",
      }),
    ],
  };
});
