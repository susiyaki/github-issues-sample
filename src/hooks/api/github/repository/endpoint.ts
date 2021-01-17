type GetRepositoryQueryParams = {
  owner: string;
  repo: string;
};

export type {GetRepositoryQueryParams};

export const githubRepositoryEndpoint = {
  getRepository: ({owner, repo}: GetRepositoryQueryParams): string =>
    `repos/${owner}/${repo}`,
};
