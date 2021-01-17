type GetIssuesQueryParams = {
  owner: string;
  repo: string;
  offset: number;
  limit: number;
};
type GetIssueQueryParams = {
  owner: string;
  repo: string;
  issueNumStr: string;
};

export type {GetIssuesQueryParams, GetIssueQueryParams};

export const githubIssueEndpoint = {
  getIssues: ({
    owner: orgs,
    repo,
    offset,
    limit,
  }: GetIssuesQueryParams): string =>
    `repos/${orgs}/${repo}/issues?page=${offset}&per_page=${limit}`,

  getIssue: ({owner: orgs, repo, issueNumStr}: GetIssueQueryParams): string =>
    `repos/${orgs}/${repo}/issues/${issueNumStr}`,
};
