type GetIssuesQueryParams = {
  owner: string;
  repo: string;
  page: number;
  per_page: number;
  state?: 'all' | 'open' | 'closed';
};
type GetIssueQueryParams = {
  owner: string;
  repo: string;
  issueNumStr: string;
};

export type {GetIssuesQueryParams, GetIssueQueryParams};

export const githubIssueEndpoint = {
  getIssues: ({
    owner,
    repo,
    page,
    per_page,
    state,
  }: GetIssuesQueryParams): string =>
    `repos/${owner}/${repo}/issues?page=${page}&per_page=${per_page}&state=${
      state || 'all'
    }`,

  getIssue: ({owner, repo, issueNumStr}: GetIssueQueryParams): string =>
    `repos/${owner}/${repo}/issues/${issueNumStr}`,

  openIssues: ({owner, repo, issueNumStr}: GetIssueQueryParams): string =>
    `repos/${owner}/${repo}/issues/${issueNumStr}`,
};
