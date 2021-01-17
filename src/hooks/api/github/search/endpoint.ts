type SearchIssuesQueryParams = {
  repo: string;
  state?: 'open' | 'closed';
};

export type {SearchIssuesQueryParams};

export const githubSearchEndpoint = {
  searchIssues: ({repo, state}: SearchIssuesQueryParams): string =>
    `search/issues?q=repo:${repo}+type:issue${state && `+state:${state}`}`,
};
