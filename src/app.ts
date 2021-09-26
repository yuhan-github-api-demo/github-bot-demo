import { Probot, run } from "probot";
import IndexCheck from "./index";
import issueOpenCheck from "./issue-open-check";

const allApp = (app: Probot) => {
  issueOpenCheck(app);
  IndexCheck(app);
};
run(allApp);
