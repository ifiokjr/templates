import { defineTemplate } from "../../scaffold/mod.ts";

export default defineTemplate({
  getPermissions: { run: ["git", "deno"] },
  async getVariables({ prompt, type, initialVariables }) {
    const answers = await prompt([
      {
        message: "Name",
        type: type.Input,
        name: "name",
        hint: typeof initialVariables.name === "string"
          ? initialVariables.name
          : undefined,
      },
      {
        message: "Description",
        type: type.Input,
        name: "description",
        hint: typeof initialVariables.description === "string"
          ? initialVariables.description
          : undefined,
      },
    ]);

    return {
      ...initialVariables,
      year: new Date().getUTCFullYear(),
      ...answers,
    };
  },
  getInstallCommand({ destination }) {
    return async () => {
      await Deno.run({
        cmd: ["deno", "task", "lock"],
        cwd: destination,
      }).status();

      await Deno.run({
        cmd: ["git", "add", "."],
        cwd: destination,
      }).status();

      await Deno.run({
        cmd: ["git", "commit", "-m", '"feat: initial commit 🎉'],
        cwd: destination,
      }).status();
    };
  },
});
