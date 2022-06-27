import { defineTemplate } from "https://deno.land/x/scaffold@0.1.1/mod.ts";

export default defineTemplate({
  getPermissions: { run: ["git", "deno"] },
  async getVariables({ prompt, type, initialVariables }) {
    const answers = await prompt([
      {
        message: "Name",
        type: type.Input,
        name: "name",
        default: initialVariables.name as string,
      },
      {
        message: "Description",
        type: type.Input,
        name: "description",
        default: initialVariables.description as string,
      },
    ]);

    return {
      ...initialVariables,
      year: new Date().getUTCFullYear(),
      ...answers,
    };
  },
  getInstallCommand({ destination, permissions }) {
    return async () => {
      if (permissions.run.includes("deno")) {
        await Deno.run({
          cmd: ["deno", "task", "lock:update"],
          cwd: destination,
        }).status();
      }

      if (permissions.run.includes("git")) {
        await Deno.run({
          cmd: ["git", "init"],
          cwd: destination,
        }).status();

        await Deno.run({
          cmd: ["git", "add", "."],
          cwd: destination,
        }).status();

        await Deno.run({
          cmd: ["git", "commit", "-m", "feat: initial commit 🎉"],
          cwd: destination,
        }).status();
      }
    };
  },
});
