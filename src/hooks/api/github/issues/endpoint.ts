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
  getIssues: ({owner, repo, offset, limit}: GetIssuesQueryParams): string =>
    `repos/${owner}/${repo}/issues?page=${offset}&per_page=${limit}`,

  getIssue: ({owner, repo, issueNumStr}: GetIssueQueryParams): string =>
    `repos/${owner}/${repo}/issues/${issueNumStr}`,
};
