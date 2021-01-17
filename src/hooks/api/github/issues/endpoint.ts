type GetIssuesQueryParams = {
  owner: string;
  repo: string;
  page: number;
  perPage: number;
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
    perPage,
    state,
  }: GetIssuesQueryParams): string =>
    `repos/${owner}/${repo}/issues?page=${page}&per_page=${perPage}&state=${
      state || 'all'
    }`,

  getIssue: ({owner, repo, issueNumStr}: GetIssueQueryParams): string =>
    `repos/${owner}/${repo}/issues/${issueNumStr}`,

  openIssues: ({owner, repo, issueNumStr}: GetIssueQueryParams): string =>
    `repos/${owner}/${repo}/issues/${issueNumStr}`,
};
