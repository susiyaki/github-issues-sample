export const githubRepositoryEndpoint = {
  getRepository: ({owner, repo}: {owner: string; repo: string}): string =>
    `repos/${owner}/${repo}`,
};
