import { defineTemplate } from "https://deno.land/x/scaffold@0.3.0/mod.ts";

export default defineTemplate({
  getPermissions: { run: ["git"] },
  async getVariables({ prompt, type, initialVariables }) {
    const answers = await prompt([
      {
        message: "Author",
        type: type.Input,
        name: "author",
        default: initialVariables.username,
      },
      {
        message: "Email",
        type: type.Input,
        name: "email",
        default: initialVariables.email,
      },
      {
        message: "Twitter Username",
        type: type.Input,
        name: "twitter",
        default: initialVariables.user ?? "twitter_username",
      },
      {
        message: "GitHub Username",
        type: type.Input,
        name: "github",
        default: initialVariables.user ?? "github_username",
      },
      { message: "Description", type: type.Input, name: "description" },
      {
        message: "Google Analytics Key",
        type: type.Input,
        name: "analytics",
        default: "UA-XXXXXXXX-X",
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
