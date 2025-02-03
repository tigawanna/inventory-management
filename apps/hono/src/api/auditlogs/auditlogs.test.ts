import { testClient } from "hono/testing";
import { describe, expect, it } from "vitest";

import { createTestApp } from "@/lib/create-app";

import router from "./auditlogs.index";

describe("auditlogs", () => {
  it("get  /auditlog", async () => {
    const response = await router.request("/", { method: "GET" });
    expect(response.status).toBe(200);
  });
  it("get with hono test client /auditlog", async () => {
    const client = testClient<typeof router>(createTestApp(router));
    const listResponse = await (await client.index.$get({ query: {} })).json();
    expect(listResponse.result).toHaveProperty("items");
  });
});
