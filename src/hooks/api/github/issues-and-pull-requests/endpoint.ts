type SearchIssuesAndPullRequestsQueryParams = {
  repo: string;
  type?: 'issue' | 'pr';
  state?: 'open' | 'closed';
};

export type {SearchIssuesAndPullRequestsQueryParams};

export const githubIssuesAndPullRequestsEndpoint = {
  search: ({
    repo,
    type,
    state,
  }: SearchIssuesAndPullRequestsQueryParams): string =>
    `search/issues?q=repo:${repo}${type && `+type:${type}`}${
      state && `+state:${state}`
    }`,
};
