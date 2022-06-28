import { describe, it } from "./deps.ts";
import { snapshot } from "./helpers.ts";

describe("main", () => {
  it("should create snapshots", async (t) => {
    await snapshot(t, { hello: "world" });
  });
});
