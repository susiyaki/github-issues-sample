export const githubIssueEndpoint = {
  getIssues: ({
    owner: orgs,
    repo,
    offset,
    limit,
  }: {
    owner: string;
    repo: string;
    offset: number;
    limit: number;
  }): string => `repos/${orgs}/${repo}/issues?page=${offset}&per_page=${limit}`,

  getIssue: ({
    owner: orgs,
    repo,
    issueNumStr,
  }: {
    owner: string;
    repo: string;
    issueNumStr: string;
  }): string => `repos/${orgs}/${repo}/issues/${issueNumStr}`,
};
