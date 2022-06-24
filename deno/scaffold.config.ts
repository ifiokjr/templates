import { defineTemplate } from "https://deno.land/x/scaffold@0.1.0/mod.ts";

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
        default: initialVariables.name as string,
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
