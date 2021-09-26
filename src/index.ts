import { Probot } from "probot";

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });

  app.on("issues.edited", async (context) => {
    const data = context.payload;
    await context.octokit.issues.create({
      owner: data.repository.owner.login,
      repo: data.repository.name,
      title: data.repository.name + "title",
      body: "这里是一个测试测试",
    });
    // await context.octokit.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
