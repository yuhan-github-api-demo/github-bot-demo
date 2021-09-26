/** Check the structure of this issue */

import { Probot } from "probot";
import {
  REPOSITORY_NAME,
  ORGANIZATION_NAME,
  ARCO_ISSUE_MARK,
  ISSUE_TEMPLATE,
  COMMENT_WORDS,
} from "./constants";

export = (app: Probot) => {
  app.on(["issues.opened", "issue_comment.edited"], async (context) => {
    const config = context.payload;
    const { issue, repository, organization } = config;

    if (organization?.login !== ORGANIZATION_NAME) {
      return;
    }

    switch (repository.name) {
      case REPOSITORY_NAME.demo: {
        const { body } = issue;
        if (body.includes(ARCO_ISSUE_MARK)) {
          const isTemplate = ISSUE_TEMPLATE.every((keyWords) =>
            body.includes(keyWords)
          );
          if (!isTemplate) {
            const invalidComment = context.issue({
              body:
                `Hello，@\${{ ${issue.user.login} }}\n\n` +
                COMMENT_WORDS.invalidIssue,
            });
            await context.octokit.issues.createComment(invalidComment);
            await context.octokit.issues.update({
              issue_number: issue.number,
              owner: repository.owner.login,
              repo: repository.name,
              state: "closed",
            });
          }
        }
      }
    }
  });
};
